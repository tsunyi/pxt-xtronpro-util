namespace controller {
    function detectorNewStep(values: number) {
        if (lastAcceleration == 0) {
            lastAcceleration = values
        } else {
            if (DetectorPeak(values, lastAcceleration)) {
                timeOfLastPeak = timeOfThisPeak
                timeOfNow = control.millis();//game.runtime()
                if (timeOfNow - timeOfLastPeak >= 200 && peakOfWave - valleyOfWave >= threadThreshold && timeOfNow - timeOfLastPeak <= 2000) {
                    timeOfThisPeak = timeOfNow
                    // 视为一步，更新界面的处理，不涉及到算法
                    countStep()
                }
                if (timeOfNow - timeOfLastPeak >= 200 && peakOfWave - valleyOfWave >= initialThreshold) {
                    timeOfThisPeak = timeOfNow
                    threadThreshold = Peak_Valley_Thread(peakOfWave - valleyOfWave);
                }
            }
        }
        lastAcceleration = values
    }

    function countStep() {
        tempTimeOfLastPeak = tempTimeOfThisPeak
        tempTimeOfThisPeak = control.millis();//game.runtime()
        if (tempTimeOfThisPeak - tempTimeOfLastPeak <= 3000) {
            if (TEMP_STEP < 5) {
                TEMP_STEP += 1
            } else if (TEMP_STEP == 5) {
                TEMP_STEP += 1
                CURRENT_SETP += TEMP_STEP
            } else {
                CURRENT_SETP += 1
            }
            //console.logValue("step", CURRENT_SETP)
        } else {
            TEMP_STEP = 1
        }
    }

    let pedometerInit = false
    let accelerationXYZ = 0
    let total = 0
    let accz = 0
    let accy = 0
    let accx = 0
    let CURRENT_SETP = 0
    let TEMP_STEP = 0
    let tempTimeOfThisPeak = 0
    let tempTimeOfLastPeak = 0
    let timeOfNow = 0
    let timeOfThisPeak = 0
    let timeOfLastPeak = 0
    let threadThreshold = 0
    let initialThreshold = 0
    let lastAcceleration = 0
    let isDirectionUp = false
    let continueUpCount = 0
    let continueUpFormerCount = 0
    let lastStatus = false
    let peakOfWave = 0
    let valleyOfWave = 0
    let tempCount = 0

    function DetectorPeak(newValue: number, oldValue: number): boolean {
        lastStatus = isDirectionUp;
        if (newValue >= oldValue) {//可以换成差值大于某一值也可
            isDirectionUp = true;
            continueUpCount++;
        } else {
            continueUpFormerCount = continueUpCount;
            continueUpCount = 0;
            isDirectionUp = false;
        }

        // Log.v(TAG, "oldValue:" + oldValue);
        if (!isDirectionUp && lastStatus
            && (continueUpFormerCount >= 2 || oldValue >= 20)) {
            peakOfWave = oldValue;
            return true;
        } else if (!lastStatus && isDirectionUp) {
            valleyOfWave = oldValue;
            return false;
        } else {
            return false;
        }
    }

    function averageValue(value: number[], n: number): number {
        let ave = 0;
        for (let i = 0; i < n; i++) {
            ave += value[i];
        }
        ave = ave / valueNum;
        if (ave >= 8) {
            ave = 4.3;
        } else if (ave >= 7 && ave < 8) {
            ave = 3.3;
        } else if (ave >= 4 && ave < 7) {
            ave = 2.3;
        } else if (ave >= 3 && ave < 4) {
            ave = 2.0;
        } else {
            ave = 1.7;
        }
        return ave;
    }

    function Peak_Valley_Thread(value: number): number {
        let tempThread = threadThreshold;
        if (tempCount < valueNum) { //存储过程
            tempValue[tempCount] = value;
            tempCount++;
        } else { //计算过程
            tempThread = averageValue(tempValue, valueNum);
            for (let j = 1; j < valueNum; j++) { //   ？？？？？
                tempValue[j - 1] = tempValue[j];
            }
            tempValue[valueNum - 1] = value;
        }
        return tempThread;

    }
    
    initialThreshold = 1.7
    threadThreshold = 2
    let valueNum = 5
    let tempValue = [0, 0, 0, 0, 0]

    function startPedometer() {
        control.runInBackground(() => {
            while (1) {
                //console.log("background read");
                accx = acceleration(ControllerDimension.X) / 1000 * 9.8;
                accy = acceleration(ControllerDimension.Y) / 1000 * 9.8
                accz = acceleration(ControllerDimension.Z) / 1000 * 9.8
                total = accx * accx + accy * accy + accz * accz
                accelerationXYZ = Math.sqrt(total)
                detectorNewStep(accelerationXYZ)
                pause(50);
            }
        });
    }

    //% blockId=getuserstep
    //% block="steps"
    //% help=pedometer/get-user-steps  
    //% weight=100
    //% group="Extras"
    export function steps(): number {
        if (!pedometerInit) {
            pedometerInit = true;
            startPedometer()
        }
        return CURRENT_SETP;
    }

}// Add your code here
