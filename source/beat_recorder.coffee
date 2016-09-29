window.BeatRecorder = -> _.extend this,

  DefaultTickList: []
  DefaultIntervalMs: 50

  LoadSounds: ( ->
    this.Sounds =
      Kick: new this.Sound("kick", "sounds/kick.mp3")
      Snare: new this.Sound("snare", "sounds/rimshot.mp3")
      HiHat: new this.Sound("hihat", "sounds/hihat.mp3")
      Crash: new this.Sound("crash", "sounds/crash.mp3")
    this.AddTickInterval = ((tics, ms) ->
      this.TickInterval = new this.TickInterval(tics || this.DefaultTickList, ms || this.DefaultIntervalMs)
      this
    ).bind(this)
    this
  ).bind(this)
 
  # constructor
  TickInterval: (tics, ms) ->
    this.SoundSequence = new BeatRecorder.SoundSequence tics
    this.ms = ms
    this.tickIdx = 0
    this.TickIntervalFunction = ( ->
      if this.tickIdx > 51
        debugger
      this.SoundSequence.playAtIndex(this.tickIdx)
      this.tickIdx = this.tickIdx + 1
      if this.tickIdx >= this.SoundSequence.tics.length - 1
        this.tickIdx = 0
    ).bind(this)
    this.Start = ->
      this.interval = setInterval(this.TickIntervalFunction, this.ms)
    this.Stop = -> clearInterval(this.interval)
    this

  # Constructor
  SoundSequence: (tics) ->
    this.tics = tics
    this.AddNote = (soundId, idx) ->
      this.tics[idx].push App.Sounds[soundId]
      this
    this.RemoveNote = (soundId, idx) ->
      this.tics[idx] = _.reject this.tics[idx], (note) -> note.soundId == soundId
      this
    this.indexOutOfBounds = (idx) ->
      typeof(this.tics[idx]) == 'undefined'
    this.playAtIndex = (idx) ->
      this.tics[idx].forEach (note) -> note.Play()
    this

  # Constructor
  Sound: (soundId, filepath) ->
    this.soundId = soundId
    this.sound = createjs.Sound.registerSound(filepath, soundId)
    this.Play = ->
      createjs.Sound.play(this.soundId)
      this
    this.Stop = ->
      # TODO
    this