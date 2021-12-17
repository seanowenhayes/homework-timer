class Timer {
    #elapsedTime = 0;
    #totalTime;
    #isRunning = false;
    #lastStart;

    constructor(timeToTime) {
        if (timeToTime > 0) {
            this.#totalTime = timeToTime;
        } else {
            throw new Error('Must time a time.')
        }
    }

    #update() {
        if (this.#isRunning) {
            const now = Date.now();
            const millisSinceLast = now - this.#lastStart;
            this.#elapsedTime = this.#elapsedTime + millisSinceLast;
            this.#lastStart = now;
        }
    }

    start() {
        this.#lastStart = Date.now();
        this.#isRunning = true;
    }

    stop() {
        this.#update();
        this.#isRunning = false;
    }

    state() {
        this.#update();
        const timeRemaining = Math.max(
            0,
            this.#totalTime - this.#elapsedTime
        );
        const timeUp = timeRemaining === 0;

        return {
            totalTime: this.#totalTime,
            timeRemaining,
            timeUp,
            isRunning: this.#isRunning,
        };
    }
}
