(function() {
  window.BeatRecorder = function() {
    return _.extend(this, {
      DefaultTickList: [],
      DefaultIntervalMs: 50,
      LoadSounds: (function() {
        this.Sounds = {
          Kick: new this.Sound("kick", "sounds/kick.mp3"),
          Snare: new this.Sound("snare", "sounds/rimshot.mp3"),
          HiHat: new this.Sound("hihat", "sounds/hihat.mp3"),
          Crash: new this.Sound("crash", "sounds/crash.mp3")
        };
        this.AddTickInterval = (function(tics, ms) {
          this.TickInterval = new this.TickInterval(tics || this.DefaultTickList, ms || this.DefaultIntervalMs);
          return this;
        }).bind(this);
        return this;
      }).bind(this),
      TickInterval: function(tics, ms) {
        this.SoundSequence = new BeatRecorder.SoundSequence(tics);
        this.ms = ms;
        this.tickIdx = 0;
        this.TickIntervalFunction = (function() {
          if (this.tickIdx > 51) {
            debugger;
          }
          this.SoundSequence.playAtIndex(this.tickIdx);
          this.tickIdx = this.tickIdx + 1;
          if (this.tickIdx >= this.SoundSequence.tics.length - 1) {
            return this.tickIdx = 0;
          }
        }).bind(this);
        this.Start = function() {
          return this.interval = setInterval(this.TickIntervalFunction, this.ms);
        };
        this.Stop = function() {
          return clearInterval(this.interval);
        };
        return this;
      },
      SoundSequence: function(tics) {
        this.tics = tics;
        this.AddNote = function(soundId, idx) {
          this.tics[idx].push(App.Sounds[soundId]);
          return this;
        };
        this.RemoveNote = function(soundId, idx) {
          this.tics[idx] = _.reject(this.tics[idx], function(note) {
            return note.soundId === soundId;
          });
          return this;
        };
        this.indexOutOfBounds = function(idx) {
          return typeof this.tics[idx] === 'undefined';
        };
        this.playAtIndex = function(idx) {
          return this.tics[idx].forEach(function(note) {
            return note.Play();
          });
        };
        return this;
      },
      Sound: function(soundId, filepath) {
        this.soundId = soundId;
        this.sound = createjs.Sound.registerSound(filepath, soundId);
        this.Play = function() {
          createjs.Sound.play(this.soundId);
          return this;
        };
        this.Stop = function() {};
        return this;
      }
    });
  };

}).call(this);
