(function() {
  window.BeatRecorderDemo = function() {
    this.BeatRecorder = new BeatRecorder().LoadSounds();
    this.Kick = this.BeatRecorder.Sounds.Kick;
    this.Snare = this.BeatRecorder.Sounds.Snare;
    this.HiHat = this.BeatRecorder.Sounds.HiHat;
    this.Crash = this.BeatRecorder.Sounds.Crash;
    this.ManyKicksAtOnce = new Array(20).fill(this.Kick);
    this.ExampleTicks = {
      part1: [[HiHat].concat(ManyKicksAtOnce), [Kick], [Kick], [Kick], [Kick], [], [Kick], [], [HiHat].concat(ManyKicksAtOnce), [], [Kick], [], [Kick], [], [Kick], [], [HiHat, Snare], [], [Kick], [], [].concat(ManyKicksAtOnce), [], [Kick], [], [HiHat, Kick], [], [Kick], [], [Kick], [], [Kick], []],
      part2: [[HiHat].concat(ManyKicksAtOnce), [Kick], [Kick], [Kick], [Kick], [], [Kick], [], [HiHat].concat(ManyKicksAtOnce), [], [Kick], [], [Kick], [], [Kick], [], [HiHat, Snare], [], [Kick], [], [ManyKicksAtOnce], [], [Snare, Kick], [], [HiHat].concat(ManyKicksAtOnce), [Kick], [Kick], [Kick], [Snare, Kick], [], [Kick], []]
    };
    return this.BeatRecorder.AddTickInterval(this.ExampleTicks['part1'].concat(this.ExampleTicks['part2'])).TickInterval.Start();
  };

}).call(this);
