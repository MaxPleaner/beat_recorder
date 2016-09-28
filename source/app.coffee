window.App =
    
  StartTicks: (tics, interval) ->
    window.tickIdx = 0
    window.setInterval(App.Private.TickFn(tics), interval)

  SoundIds: () -> App.Private._GetSoundIds()
  
  PlaySound: (soundId) ->
    createjs.Sound.play(soundId);
  
  TicManips:
    
    Add: (ticks, addedTick, idx) ->
      ticksClone = App.Private.CloneArray(ticks)
      beat = ticksClone[idx]
      beat.push(addedTick)
      ticksClone
      
    Remove: (ticks, removedTick, idx) ->
      _.reject App.Private.CloneArray(ticks), (beat) ->
        beat == removedTick

  Private:

    TickFn: (tics) -> () ->
      notes = ticks[window.tickIdx]
      notes.forEach (note) ->
        App.PlaySound(note)
        console.log(note)
      window.tickIdx = window.tickIdx + 1
      if !(ticks[window.tickIdx]) then window.tickIdx = 0
    
    CloneArray: (arr) ->
      return arr unless Array.isArray arr
      _.map arr, (elem) ->
        App.Private.CloneArray(elem)

    _GetSoundIds: () ->
      Kick: this.LoadSound("kick", "sounds/kick.mp3")
      Snare: this.LoadSound("snare", "sounds/rimshot.mp3")
      HiHat: this.LoadSound("hihat", "sounds/hihat.mp3")
      Crash: this.LoadSound("crash", "sounds/crash.mp3")
      
    LoadSound: (soundId, filepath) ->
      createjs.Sound.registerSound(filepath, soundId);
      soundId
      
    