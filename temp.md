MOVES (change the Game State in G, through user actions)
  DraftCard
  SelectWitch
  DeselectWitch
  PassTurn
  SelectCard
  PlayCard
  ChooseBravery

EVENTS (change the Game State in ctx, through backend logic like endTurn)
  ShuffleAll
  DealToPlayers
  SelectFirstPlayer
  DealStartCards
  UpdatePotions
  SetStartPlayer
  CheckTasks
  AssignTasks
  UpdatePoints
  AnnounceWinner

TURN (Period of the game associated with a single player)

PHASE (determines which moves are allowed, has end phase condition, setup, cleanup)
  DraftPhase
  SelectWitchesPhase
  Trick
  PlayerTurn
  CleanUp

