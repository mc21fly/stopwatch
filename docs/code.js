class Time {
  constructor(time) {
    const givenTime = time ? time : 0;

    this.origin = new Date(givenTime).getTime();
    this.m = new Date(givenTime).getMinutes();
    this.s = new Date(givenTime).getSeconds();
    this.ms = new Date(givenTime).getMilliseconds();
  }

  formatted = () => {
    return {
      origin: this.origin.toString(),
      m: this.m.toString().padStart(2, '0'),
      s: this.s.toString().padStart(2, '0'),
      ms: this.ms.toString().padStart(3, '0'),
    };
  };
}
