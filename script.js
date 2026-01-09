/* ----------------------------------------------------------------
   0) GLOBAL VARIABLES & DOM REFERENCES
---------------------------------------------------------------- */
const possibleColors = [
  0xd32f2f, // Red
  0x1976d2, // Blue
  0x35920D, // Green
  0xF9E43E, // Yellow
  0xB75DF3, // Purple
  0xFBBB1B, // Orange
  0x00B8D9, // Cyan
  0xFF6F61, // Coral
  0x8BC34A, // Lime
  0x6D4C41  // Brown
];
const possibleStrokeColors = [
  null,
  null,
  null,
  null,
  null,
  null,
  0x0d3b66, // Cyan border
  0x2e294e, // Coral border
  0x1b5e20, // Lime border
  0x263238  // Brown border
];
const maxSelectablePlayers = possibleColors.length;

const menuDiv        = document.getElementById("menu");
const gameDiv        = document.getElementById("game-container");
const pixiContainer  = document.getElementById("pixiContainer");
const leaderboardDiv = document.getElementById("leaderboard");

const startBtn       = document.getElementById("startBtn");

const playerSelect       = document.getElementById("playerSelect");
const aiPlayerSelect     = document.getElementById("aiPlayerSelect");
// RIMOSSO: const sizeSelect = document.getElementById("sizeSelect");
// AGGIUNTO:
const widthSelect        = document.getElementById("widthSelect");
const heightSelect       = document.getElementById("heightSelect");

const turnTimerInput     = document.getElementById("turnTimerInput");
const suddenDeathTimerInput = document.getElementById("suddenDeathTimerInput");
const suddenDeathToggle  = document.getElementById("suddenDeathToggle");
const setupSelect        = document.getElementById("setupSelect");
const preformToggle      = document.getElementById("preformToggle");
const initValueSelect    = document.getElementById("initValueSelect");
const rockCellInput      = document.getElementById("rockCellInput");
const roundsPerRingInput = document.getElementById("roundsPerRingInput");
const showShrinkCounterToggle = document.getElementById("showShrinkCounterToggle");
const shrinkAnimSelect = document.getElementById("shrinkAnimSelect");
const shrinkEnabledToggle = document.getElementById("shrinkEnabledToggle");
const shrinkCoverageToggle = document.getElementById("shrinkCoverageToggle");
const shrinkCoverageInput = document.getElementById("shrinkCoverageInput");
const specialTilesToggle = document.getElementById("specialTilesToggle");
const specialTilesIntervalInput = document.getElementById("specialTilesInterval");
const specialTilesDurationInput = document.getElementById("specialTilesDuration");
const tilesOfWarToggle = document.getElementById("tilesOfWarToggle");
const showDefeatPopupToggle = document.getElementById("showDefeatPopupToggle");
const newsToggle = document.getElementById("newsToggle");
const powerupCooldownInput = document.getElementById("powerupCooldownInput");
const powerupCooldownModeSelect = document.getElementById("powerupCooldownMode");
const scoreTargetInput = document.getElementById("scoreTargetInput");
const powerupCostModeSelect = document.getElementById("powerupCostMode");
const powerupPointCostInput = document.getElementById("powerupPointCost");
const factoryModeSelect = document.getElementById("factoryModeSelect");
const factoryModeRow = document.getElementById("factoryModeRow");
const factoryEmptyRow = document.getElementById("factoryEmptyRow");
const factoryEmptyToggle = document.getElementById("factoryEmptyToggle");

if(powerupCostModeSelect){
  powerupCostModeSelect.addEventListener('change', () => {
    const isFac = (powerupCostModeSelect.value === 'factories');
    if(factoryModeRow) factoryModeRow.style.display = isFac ? 'flex' : 'none';
    if(factoryEmptyRow) factoryEmptyRow.style.display = isFac ? 'flex' : 'none';
  });
  // Trigger on load
  const isFac = (powerupCostModeSelect.value === 'factories');
  if(factoryModeRow) factoryModeRow.style.display = isFac ? 'flex' : 'none';
  if(factoryEmptyRow) factoryEmptyRow.style.display = isFac ? 'flex' : 'none';
}
const presetPreview = document.getElementById("presetPreview");
const setupPreview = document.getElementById("setupPreview");
const presetChaos2PBtn = document.getElementById("presetChaos2PBtn");
const netModeToggle = document.getElementById("netModeToggle");
const createRoomBtn = document.getElementById("createRoomBtn");
const joinRoomBtn = document.getElementById("joinRoomBtn");
const roomCodeInput = document.getElementById("roomCodeInput");
const netStatus = document.getElementById("netStatus");
const syncStateBtn = document.getElementById("syncStateBtn");
const netButtons = document.getElementById("netButtons");
const netStatusRow = document.getElementById("netStatusRow");
const netPlayerCount = document.getElementById("netPlayerCount");
const multiAiCountDisplay = document.getElementById("multiAiCount");
const incAiBtn = document.getElementById("incAiBtn");
const decAiBtn = document.getElementById("decAiBtn");
const netAiRow = document.getElementById("netAiRow");
const netPlayerCountRow = document.getElementById("netPlayerCountRow");
const powerupBar = document.getElementById("powerupBar");
const powerupRomboidBtn = document.getElementById("powerupRomboid");
const powerupViewfinderBtn = document.getElementById("powerupViewfinder");
const powerupWallBtn = document.getElementById("powerupWall");
const powerupCooldownHint = document.getElementById("powerupCooldownHint");
const powerupOptionsWrap = document.getElementById("powerupOptions");
const powerupRomboidToggle = document.getElementById("powerupRomboidToggle");
const powerupViewfinderToggle = document.getElementById("powerupViewfinderToggle");
const powerupWallToggle = document.getElementById("powerupWallToggle");
const powerupSkipToggle = document.getElementById("powerupSkipToggle");
const powerupSkipBtn = document.getElementById("powerupSkip");
const factoriesPanel = document.getElementById("factoriesPanel");

// Riferimenti all'endgame overlay
const endgameOverlay     = document.getElementById("endgameOverlay");
const winnerText         = document.getElementById("winnerText");
const restartButton      = document.getElementById("restartButton");
const restartGameButton  = document.getElementById("restartGameButton");
const downloadLogsBtn = document.getElementById("downloadLogsBtn");

// Defeat overlay references
const defeatOverlay = document.getElementById("defeatOverlay");
const defeatTitle = document.getElementById("defeatTitle");
const defeatMessage = document.getElementById("defeatMessage");
const defeatBestMove = document.getElementById("defeatBestMove");
const closeDefeatBtn = document.getElementById("closeDefeatBtn");
if(closeDefeatBtn){
  closeDefeatBtn.onclick = () => {
    defeatOverlay.classList.add('overlay-hidden');
  };
}

function showLossMessage(playerIdx){
  if(!defeatOverlay || !showDefeatPopup) return;
  defeatOverlay.classList.remove('overlay-hidden');
  const color = playerColors[playerIdx] ?? 0xd32f2f;
  if(defeatTitle){
    defeatTitle.style.color = `#${color.toString(16).padStart(6, '0')}`;
  }
  if(closeDefeatBtn){
    const hex = `#${color.toString(16).padStart(6, '0')}`;
    closeDefeatBtn.style.backgroundColor = hex;
    closeDefeatBtn.style.borderColor = hex;
    closeDefeatBtn.style.color = '#ffffff';
  }
  if(defeatMessage){
    defeatMessage.textContent = "Il tuo impero è caduto. La partita continua per gli altri.";
  }
  if(defeatBestMove){
    defeatBestMove.textContent = buildDefeatBestMove(playerIdx);
  }
}

// Riferimenti ai timer
const timerDisplayElem = document.getElementById("timerDisplay");
const turnTimerDisplayElem      = document.getElementById("turnTimerDisplay");
const suddenDeathTimerDisplayElem = document.getElementById("suddenDeathTimerDisplay");
const shrinkCounterDisplayElem = document.getElementById("shrinkCounterDisplay");
const shrinkCoverageBufferElem = document.getElementById("shrinkCoverageBuffer");
const shrinkCoverageFillElem = document.getElementById("shrinkCoverageFill");
const shrinkCoverageLabelElem = document.getElementById("shrinkCoverageLabel");
const commentaryBar = document.getElementById("commentaryBar");
const newsFeed = document.getElementById("newsFeed");
const newsBox = document.getElementById("newsBox");
const newsMinBtn = document.getElementById("newsMinBtn");
const pauseGameButton = document.getElementById("pauseGameButton");
const pauseOverlay = document.getElementById("pauseOverlay");
const resumeBtn = document.getElementById("resumeBtn");
const pauseRestartBtn = document.getElementById("pauseRestartBtn");
const pauseExitBtn = document.getElementById("pauseExitBtn");
const replayLastMoveBtn = document.getElementById("replayLastMoveBtn");
const reportTileBtn = document.getElementById("reportTileBtn");
const exportLogBtn = document.getElementById("exportLogBtn");
const reportOverlay = document.getElementById("reportOverlay");
const reportReadout = document.getElementById("reportReadout");
const reportCancelBtn = document.getElementById("reportCancelBtn");
const boardOverlay = document.getElementById("boardOverlay");
const boardOverlayTop = document.querySelector("#boardOverlay .board-overlay-top");
const boardOverlayLeft = document.querySelector("#boardOverlay .board-overlay-left");
const boardOverlayGrid = document.querySelector("#boardOverlay .board-overlay-grid");
const preformMenu = document.getElementById("preformMenu");
const preformTitle = document.getElementById("preformTitle");
const preformPreview = document.getElementById("preformPreview");
const preformPrevBtn = document.getElementById("preformPrevBtn");
const preformNextBtn = document.getElementById("preformNextBtn");
const preformRotateBtn = document.getElementById("preformRotateBtn");
const confirmOverlay = document.getElementById("confirmOverlay");
const confirmTitle = document.getElementById("confirmTitle");
const confirmMessage = document.getElementById("confirmMessage");
const confirmYesBtn = document.getElementById("confirmYesBtn");
const confirmNoBtn = document.getElementById("confirmNoBtn");

// Helper for generating unique grid keys
function keyXY(x, y) { return `${x},${y}`; }

function logEvent(type, data = {}){
  debugLog.push({
    ts: new Date().toISOString(),
    type,
    data
  });
  if(debugLog.length > debugLogMax){
    debugLog.splice(0, debugLog.length - debugLogMax);
  }
}

function resetDebugLog(){
  debugLog.length = 0;
}

function snapshotTileState(tile){
  if(!tile) return null;
  return {
    player: tile.player,
    value: tile.value,
    isRock: tile.isRock,
    isVoid: tile.isVoid,
    isExploding: tile.isExploding,
    shape: tile.shape
  };
}

function logTileChange(x, y, before, after, reason){
  if(!before || !after) return;
  const changed = (
    before.player !== after.player ||
    before.value !== after.value ||
    before.isRock !== after.isRock ||
    before.isVoid !== after.isVoid ||
    before.isExploding !== after.isExploding ||
    before.shape !== after.shape
  );
  if(!changed) return;
  if(currentMoveCapture){
    currentMoveCapture.tiles.add(`${x},${y}`);
  }
  logEvent('tile_change', {
    coord: `${colToLabel(x)}${y + 1}`,
    x,
    y,
    reason,
    before,
    after,
    turnPlayer,
    roundsCompleted,
    shrinkRoundsCompleted,
    turnsTaken,
    ringsApplied
  });
}

function replayLastMove(){
  if(!lastMoveReplay || !grid || !app) return;
  const origin = lastMoveReplay.origin;
  const tiles = lastMoveReplay.tiles || [];
  const overlay = new PIXI.Container();
  overlay.zIndex = 50;
  const accent = 0x000000;
  const playerColor = playerColors[lastMoveReplay.player] ?? 0x111111;

  const drawMarker = (x, y, color, thickness, alpha) => {
    const g = new PIXI.Graphics();
    g.lineStyle(thickness, color, alpha);
    g.drawRoundedRect(1, 1, tileSize - 2, tileSize - 2, getTileCornerRadius());
    g.x = x * tileSize;
    g.y = y * tileSize;
    overlay.addChild(g);
    return g;
  };

  tiles.forEach(({x, y}) => {
    drawMarker(x, y, accent, 2, 0.7);
  });
  const originMarker = drawMarker(origin.x, origin.y, playerColor, 3, 0.95);
  originMarker.filters = [new PIXI.filters.BlurFilter(3)];

  if(fxLayer) fxLayer.addChild(overlay);
  else app.stage.addChild(overlay);

  gsap.fromTo(overlay, {alpha: 0}, {
    alpha: 1,
    duration: 0.2,
    yoyo: true,
    repeat: 3,
    onComplete: () => {
      if(fxLayer) fxLayer.removeChild(overlay);
      else app.stage.removeChild(overlay);
    }
  });
}

// Variabile globale per il toggle “Mostra numeri”
let showNumbers = false;
// Riferimento al checkbox e suo listener
const toggleNumbersCheckbox = document.getElementById("toggleNumbers");
toggleNumbersCheckbox.addEventListener('change', () => {
  showNumbers = toggleNumbersCheckbox.checked;
  updateAllTilesVisibility();
});

/* Game state */
let app;
let turnWatchdog = null;
let pendingSyncSnapshot = null;
let logicalRoundWorkDone = false;
let currentTurnSessionId = 0;
let fxLayer = null;
let isPaused = false;
let pendingConfirmAction = null;
let aiMoveTimeoutId = null;
let pendingAIMovePlayer = null;

function resetTurnWatchdog(){
  if(turnWatchdog) clearTimeout(turnWatchdog);
  turnWatchdog = setTimeout(()=>{
    if(turnInProgress || animationsInProgress > 0){
      console.warn("Turn watchdog triggered: forcing cleanup.");
      killAllAnimations();
      endTurn();
    }
  }, 12000); 
}

function clearTurnWatchdog(){
  if(turnWatchdog) clearTimeout(turnWatchdog);
}

// GRIGLIA: invece di un solo "gridSizeNum", usiamo "gridWidthNum" e "gridHeightNum"
let gridWidthNum = 6;
let gridHeightNum = 6;

let tileSize = 60;

function computeTileSizeForViewport(){
  const fallbackTile = 40;
  const viewW = window.innerWidth || 800;
  const viewH = window.innerHeight || 600;
  let padX = 40;
  let padY = 130;
  let gap = 16;
  if(gameDiv){
    const styles = window.getComputedStyle(gameDiv);
    padX = (parseFloat(styles.paddingLeft) || 0) + (parseFloat(styles.paddingRight) || 0);
    padY = (parseFloat(styles.paddingTop) || 0) + (parseFloat(styles.paddingBottom) || 0);
    gap = parseFloat(styles.gap) || gap;
  }
  const anyPowerupEnabled = tilesOfWarEnabled && Object.values(powerupEnabled || {}).some(Boolean);
  const powerupVisible = powerupBar && powerupBar.offsetParent !== null && powerupBar.offsetHeight > 0;
  const timerVisible = timerDisplayElem && timerDisplayElem.offsetParent !== null && timerDisplayElem.offsetHeight > 0;
  const powerupHeight = powerupVisible ? powerupBar.offsetHeight : (anyPowerupEnabled ? 58 : 0);
  const timerHeight = timerVisible ? timerDisplayElem.offsetHeight : 0;
  const reservedV = powerupHeight + timerHeight
    + gap * ((powerupHeight > 0 ? 1 : 0) + (timerHeight > 0 ? 1 : 0));
  const availableW = Math.max(0, viewW - padX);
  const availableH = Math.max(0, viewH - padY - reservedV);
  let size = Math.floor(Math.min(availableW / gridWidthNum, availableH / gridHeightNum));
  if(!Number.isFinite(size) || size <= 0) size = fallbackTile;
  return Math.max(24, Math.min(72, size));
}

function resizeBoardToFitViewport(animate = true){
  if(!app || !pixiContainer) return;
  const targetTileSize = computeTileSizeForViewport();
  if(!Number.isFinite(targetTileSize) || targetTileSize <= 0) return;
  const w = gridWidthNum * targetTileSize;
  const h = gridHeightNum * targetTileSize;

  const applyResize = (newSize) => {
    tileSize = newSize;
    app.renderer.resize(gridWidthNum * tileSize, gridHeightNum * tileSize);
    pixiContainer.style.width = `${gridWidthNum * tileSize}px`;
    pixiContainer.style.height = `${gridHeightNum * tileSize}px`;
    for(let x=0;x<gridWidthNum;x++){
      for(let y=0;y<gridHeightNum;y++){
        const tile = grid[x][y];
        if(!tile) continue;
        tile.x = x * tileSize;
        tile.y = y * tileSize;
        tile.circle.x = tileSize / 2;
        tile.circle.y = tileSize / 2;
        tile.text.x = tileSize / 2;
        tile.text.y = tileSize / 2;
        tile.text.style.fontSize = tileSize / 2;
        updateTileGraphics(tile);
      }
    }
    updateBoardOverlayLayout();
    if(preformEnabled && setupPhase){
      renderPreformOverlay(preformHoverAnchor);
    }
    renderFormationOverlay();
  };

  if(!animate){
    applyResize(targetTileSize);
    return;
  }

  const startSize = tileSize;
  const delta = targetTileSize - startSize;
  if(Math.abs(delta) < 0.5){
    applyResize(targetTileSize);
    return;
  }
  const tweenObj = {v: startSize};
  gsap.to(tweenObj, {
    duration: 0.6,
    ease: "power2.out",
    v: targetTileSize,
    onUpdate: () => applyResize(tweenObj.v),
    onComplete: () => applyResize(targetTileSize)
  });
}

let grid = [];

let totalPlayers = 2;
let totalAIPlayers = 0;
let playerColors = [];
let isAIPlayer = []; // true se giocatore è AI

let turnPlayer = 0;
let tilesCount = [];

// For manual setup: track if a player has placed his first orb and where.
let initialPlacements = [];

let manualSetup = false;
let setupMode = 'auto';
let preformEnabled = false;
let preformState = {
  selectedIndex: 0,
  rotation: 0,
  placed: [],
  randomPatterns: []
};
let preformRegions = [];
let preformSeedCenters = [];
let preformHoverAnchor = null;
let setupPhase  = false;
let playersWhoHavePlaced = 0;
let initialTileValue = 1;

let turnInProgress = false;
let animationsInProgress = 0;
let turnEnded = false;

let leaderboardEntries = [];
let playerPeakTiles = [];
let playerPeakPoints = [];
let playerBestPushCaptures = [];
let playerBestPushRegion = [];
let playerBestPushExplosions = [];
let playerEliminated = [];
let playerPointsCurrent = [];
let playerPowerupUsage = [];
let useChaosPreset = false;

/* Timer */
let turnTimerSeconds = parseInt(turnTimerInput.value, 10);
let suddenDeathTimerSeconds = parseInt(suddenDeathTimerInput.value, 10);
let turnTimerIntervalId = null;
let turnTimerTimeoutId = null;
let turnTimeRemaining = 0;

let suddenDeathIntervalId = null;
let suddenDeathTimeRemaining = 0;
let suddenDeathEnabled = suddenDeathToggle.checked;
let showShrinkCounter = false;
let shrinkCoverageGateEnabled = true;
let shrinkCoveragePercent = 75;
let shrinkGateReached = false;
let shrinkCoverageTargetCount = 0;
let tilesOfWarEnabled = false;
let powerupEnabled = { romboid: true, viewfinder: true, wall: true, skip: true };
let showDefeatPopup = !!(showDefeatPopupToggle && showDefeatPopupToggle.checked);
let newsEnabled = !!(newsToggle && newsToggle.checked);
const debugLog = [];
const debugLogMax = 800;
let powerupCooldownTurns = 2;
let powerupCooldownMode = 'block'; // block or perPower
let powerupCooldowns = [];
let activePowerup = null; // 'romboid'|'viewfinder'|'wall'|'skip'
let pendingPowerAction = null; // {type:'wall', anchor:{x,y}}
let wallEdges = new Set(); // store edges "x1,y1|x2,y2"
let wallsLayer = null;
let wallPreviewLayer = null;
let preformOverlayLayer = null;
let formationOverlayLayer = null;
let wallsToRemove = new Set();
let useQuadrantSeedPreset = false;
let applyQuadrantSeedThisGame = false;
let currentMoveCapture = null;
let lastMoveReplay = null;

/* Rounds & shrinking rings */
let turnsTaken = 0;          // total individual turns completed
let roundsCompleted = 0;     // full rotations completed (every totalPlayers turns)
let roundsPerRing = 10;      // after this many rounds, shrink outer ring
let shrinkRoundsCompleted = 0; // rounds counted since shrink gate reached
let ringsApplied = 0;        // how many rings already applied
let shrinkAnimMode = 'fall';
let shrinkEnabled = true;
let skipTurns = [];
let playerBonusPoints = [];
let totalTurnsCounter = 0;
let specialTilesEnabled = false;
let specialTilesInterval = 5;
let specialTilesDuration = 3;
let activeSpecialTiles = new Set();
let scoreTarget = 100;
let powerupCostMode = 'tile'; // tile | points | either
let powerupPointCost = 20;
let factoryMode = 'choose'; // choose | random
let assignedFactories = []; // per player: index of assigned factory
let powerupCredits = []; // per player: number of pending credits
let factoryStrictEmpty = true;
let formationStates = [];
let netMode = 'local';
let ws = null;
let roomId = null;
let isHost = false;
let mySeat = 0;
let myClientId = null;
let peers = [];
let startingPeers = [];
let awaitingSync = false;
const WS_URL = !window.location.hostname || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? "ws://localhost:8080"
  : `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}`;
let suppressNetwork = false;
let networkTurnToken = 0;
let isPlayback = false;
let clickLock = false;
let clickLockToken = 0;
let multiAiCount = 0;
let pendingActions = [];

function mulberry32(a){
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function withSeed(seed, fn){
  const rng = mulberry32(seed|0);
  const oldRand = Math.random;
  Math.random = rng;
  try{ return fn(); } finally { Math.random = oldRand; }
}

function computeMySeat(){
  const list = (startingPeers && startingPeers.length) ? startingPeers : peers;
  if(!list || !list.length || myClientId==null) return 0;
  const sorted = list.slice().sort((a,b)=> (a.id||0) - (b.id||0));
  const idx = sorted.findIndex(p=>p.id === myClientId);
  return idx;
}
async function copyRoomCode(code){
  try{
    await navigator.clipboard.writeText(code);
    postNews(`Room code ${code} copied to clipboard.`, 0x1d4ed8);
  } catch(e){
    console.warn('Clipboard copy failed', e);
  }
}

/* Commentary state */
let currentTurnStats = null; // collects info about the current player's move
let lastMoverIndex = null;
let turnCommentaryEmitted = false;
let ringAnimationInProgress = false;
let suppressAutoEndTurn = false;
let pendingElimination = [];
let skipRoundProgressOnce = false;

const colorNames = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];
function getColorName(i){ return colorNames[i] || `Player ${i+1}`; }

function regionName(x, y){
  const cx = (gridWidthNum - 1) / 2;
  const cy = (gridHeightNum - 1) / 2;
  const dx = x - cx; const dy = y - cy;
  const ax = Math.abs(dx); const ay = Math.abs(dy);
  const nearCenter = (ax <= 1 && ay <= 1);
  if(nearCenter) return "the center";
  const vertical = dy < 0 ? "northern" : "southern";
  const horizontal = dx < 0 ? "western" : "eastern";
  if(ax > ay) return `the ${horizontal} sector`;
  if(ay > ax) return `the ${vertical} front`;
  return `the ${vertical}-${horizontal} quarter`;
}

function beginTurnStats(player, x, y){
  currentTurnStats = {
    player,
    startX: x,
    startY: y,
    region: regionName(x, y),
    isEdge: (x === 0 || y === 0 || x === gridWidthNum - 1 || y === gridHeightNum - 1),
    increment: false,
    explosions: 0,
    captures: 0,
    capturedPlayers: new Set(),
    emitted: false,
    neighborEnemies: [],
    captureCounts: {},
    eliminatedPlayers: [],
    powderKeg: false
  };
  lastMoverIndex = player;
  turnCommentaryEmitted = false;
  try{
    const nbs = getNeighbors(x, y);
    const enemies = [];
    let count3 = 0;
    nbs.forEach(p => {
      const t = grid[p.x][p.y];
      if(t && typeof t.player === 'number' && t.player !== player && t.value > 0){ if(!enemies.includes(t.player)) enemies.push(t.player); }
      if(t && t.value === 3) count3++;
    });
    currentTurnStats.neighborEnemies = enemies;
    currentTurnStats.powderKeg = (count3 >= 2);
  } catch(e){}
}

function emitTurnCommentaryIfNeeded(){
  if(currentTurnStats && !currentTurnStats.emitted){
    const text = buildCommentaryLine(currentTurnStats);
    setCommentary(text, playerColors[currentTurnStats.player]);
    updateBestPush(currentTurnStats);
    currentTurnStats.emitted = true;
    turnCommentaryEmitted = true;
    currentTurnStats = null;
  } else if(!currentTurnStats){
    if(turnCommentaryEmitted) return;
    const idx = (typeof lastMoverIndex === 'number') ? lastMoverIndex : turnPlayer;
    const text = buildIdleCommentary(idx);
    setCommentary(text, playerColors[idx]);
    turnCommentaryEmitted = true;
  }
}

function setCommentary(text, color){ postNews(text, color); }

function playerHasLevel3(pIdx){
  for(let x=0;x<gridWidthNum;x++){
    for(let y=0;y<gridHeightNum;y++){
      const t = grid[x][y];
      if(t && t.player===pIdx && t.value>=3) return true;
    }
  }
  return false;
}
function setPowerupCooldown(playerIdx){
  ensureCooldownEntry(playerIdx);
  if(powerupCooldownMode === 'perPower'){
    // Default to blocking all if no power specified
    ['romboid','viewfinder','wall','skip'].forEach(p=>{
      powerupCooldowns[playerIdx][p] = powerupCooldownTurns;
    });
  } else {
    powerupCooldowns[playerIdx] = powerupCooldownTurns;
  }
}
function setPowerupCooldownFor(playerIdx, power){
  ensureCooldownEntry(playerIdx);
  if(powerupCooldownMode === 'perPower'){
    powerupCooldowns[playerIdx][power] = powerupCooldownTurns;
  } else {
    powerupCooldowns[playerIdx] = powerupCooldownTurns;
  }
}
function ensureCooldownEntry(playerIdx){
  if(powerupCooldownMode === 'perPower'){
    if(!powerupCooldowns[playerIdx] || typeof powerupCooldowns[playerIdx] !== 'object'){
      powerupCooldowns[playerIdx] = {romboid:0, viewfinder:0, wall:0, skip:0};
    } else {
      ['romboid','viewfinder','wall','skip'].forEach(p=>{
        if(typeof powerupCooldowns[playerIdx][p] !== 'number') powerupCooldowns[playerIdx][p]=0;
      });
    }
  } else {
    if(typeof powerupCooldowns[playerIdx] !== 'number') powerupCooldowns[playerIdx]=0;
  }
}
function getPowerCooldown(playerIdx, power){
  ensureCooldownEntry(playerIdx);
  if(powerupCooldownMode === 'perPower'){
    return powerupCooldowns[playerIdx][power]||0;
  }
  return powerupCooldowns[playerIdx]||0;
}
function decrementCooldown(playerIdx){
  ensureCooldownEntry(playerIdx);
  if(powerupCooldownMode === 'perPower'){
    ['romboid','viewfinder','wall','skip'].forEach(p=>{
      powerupCooldowns[playerIdx][p] = Math.max(0, (powerupCooldowns[playerIdx][p]||0)-1);
    });
  } else {
    powerupCooldowns[playerIdx] = Math.max(0, (powerupCooldowns[playerIdx]||0)-1);
  }
}
function canUsePower(power){
  if(!tilesOfWarEnabled) return false;
  if(!powerupEnabled[power]) return false;
  if(turnInProgress || pendingPowerAction) return false;
  if(powerupCostMode === 'formations'){
    if(!getFormationState(turnPlayer).ready) return false;
  } else if(!playerHasLevel3(turnPlayer)){
    return false;
  }
  return getPowerCooldown(turnPlayer, power) <= 0;
}
function getFormationState(playerIdx){
  if(!formationStates[playerIdx]){
    formationStates[playerIdx] = {turnsStable:0, ready:false, match:null};
  }
  return formationStates[playerIdx];
}
function rotateVector(vec, turns){
  let x = vec.x, y = vec.y;
  const t = ((turns % 4) + 4) % 4;
  for(let i=0;i<t;i++){
    const nx = y;
    const ny = -x;
    x = nx; y = ny;
  }
  return {x, y};
}
function chooseFormationRotation(sx, sy, patternDef){
  const grid = patternDef.grid;
  const sizeY = grid.length;
  const sizeX = grid[0].length;
  const centerX = sx + (sizeX - 1) / 2;
  const centerY = sy + (sizeY - 1) / 2;
  const boardCx = (gridWidthNum - 1) / 2;
  const boardCy = (gridHeightNum - 1) / 2;
  const dir = {x: boardCx - centerX, y: boardCy - centerY};
  let best = 0;
  let bestDot = -Infinity;
  for(let r=0;r<4;r++){
    const fwd = rotateVector(patternDef.forward, r);
    const dot = fwd.x * dir.x + fwd.y * dir.y;
    if(dot > bestDot){
      bestDot = dot;
      best = r;
    }
  }
  return best;
}
function matchFormationAt(playerIdx, patternDef, sx, sy){
  const rotation = chooseFormationRotation(sx, sy, patternDef);
  const patternGrid = getRotatedPattern(patternDef.grid, rotation);
  const sizeY = patternGrid.length;
  const sizeX = patternGrid[0].length;
  for(let y=0;y<sizeY;y++){
    for(let x=0;x<sizeX;x++){
      const gx = sx + x;
      const gy = sy + y;
      if(gx < 0 || gy < 0 || gx >= gridWidthNum || gy >= gridHeightNum) return null;
      const tile = grid[gx][gy];
      if(!tile || tile.isVoid || tile.isRock) return null;
      const req = patternGrid[y][x];
      
      // If req > 0, it's a core part of the shape. Must match exactly.
      if(req === 3){
        if(tile.player !== playerIdx || tile.value !== 3) return null;
      } else if(req === 2){
        if(tile.player !== playerIdx || tile.value !== 2) return null;
      } else if(req === 1){
        // Assuming 1 means value 1
        if(tile.player !== playerIdx || tile.value !== 1) return null;
      } else {
        // req === 0. This is the "border" or empty space requirement.
        if(factoryStrictEmpty){
          // Strict: Must not be owned by enemy OR be a 3.
          if(tile.player !== null && tile.player !== playerIdx) return null; // Enemy? Fail.
          if(tile.value === 3) return null; // Unstable 3? Fail.
        } else {
          // Permissive: Just don't break the shape (don't be part of another pattern? No, just don't be enemy)
          // Actually, standard "formation" usually implies shape isolation.
          // If permissive, we allow allied tiles of ANY value here? 
          // Or maybe just allow allied tiles.
          // Let's say: must not be enemy. Allied 3s are OK.
          if(tile.player !== null && tile.player !== playerIdx) return null;
        }
      }
    }
  }
  return {name: patternDef.name, x: sx, y: sy, rotation, key: `${patternDef.name}:${sx},${sy}:${rotation}`};
}
function detectFormationForPlayer(playerIdx){
  for(const pattern of formationPatterns){
    const grid = pattern.grid;
    const sizeY = grid.length;
    const sizeX = grid[0].length;
    for(let y=0;y<=gridHeightNum - sizeY;y++){
      for(let x=0;x<=gridWidthNum - sizeX;x++){
        const match = matchFormationAt(playerIdx, pattern, x, y);
        if(match) return match;
      }
    }
  }
  return null;
}
function updateFormationStateForPlayer(playerIdx){
  const state = getFormationState(playerIdx);
  // Reset match first
  state.turnsStable = 0;
  state.ready = false;
  state.match = null;

  if(!tilesOfWarEnabled || powerupCostMode !== 'factories'){
    return;
  }
  
  // Choose Mode: Check all patterns
  // Random Mode: Check only assigned pattern
  const patternsToCheck = (factoryMode === 'random' && assignedFactories[playerIdx] !== null) 
    ? [formationPatterns[assignedFactories[playerIdx]]]
    : formationPatterns;

  let bestMatch = null;
  for(const pattern of patternsToCheck){
    if(!pattern) continue;
    const grid = pattern.grid;
    const sizeY = grid.length;
    const sizeX = grid[0].length;
    for(let y=0;y<=gridHeightNum - sizeY;y++){
      for(let x=0;x<=gridWidthNum - sizeX;x++){
        const match = matchFormationAt(playerIdx, pattern, x, y);
        if(match) {
          bestMatch = match;
          break; 
        }
      }
      if(bestMatch) break;
    }
    if(bestMatch) break;
  }

  if(bestMatch){
    state.match = bestMatch;
    state.ready = true; // Instant ready for UI feedback, but consumption requires click
  }
}
function consumeFormationCost(playerIdx){
  if(powerupCostMode === 'formations'){
    const state = getFormationState(playerIdx);
    state.turnsStable = 0;
    state.ready = false;
    state.match = null;
  } else if(powerupCostMode === 'factories'){
    if(powerupCredits[playerIdx] > 0){
      powerupCredits[playerIdx]--;
    }
  }
}

// New function to claim a factory match
function claimFactory(playerIdx, patternIndex){
  if(turnPlayer !== playerIdx) return;
  const state = getFormationState(playerIdx);
  if(!state.match) return;
  
  // Verify the match corresponds to the clicked card
  const pattern = formationPatterns[patternIndex];
  if(state.match.name !== pattern.name) return;

  // Grant credit
  powerupCredits[playerIdx]++;
  
  // In random mode, assign a NEW factory
  if(factoryMode === 'random'){
    let newIdx = assignedFactories[playerIdx];
    // Simple logic: pick random distinct from current if possible
    if(formationPatterns.length > 1){
      while(newIdx === assignedFactories[playerIdx]){
        newIdx = Math.floor(Math.random() * formationPatterns.length);
      }
    }
    assignedFactories[playerIdx] = newIdx;
  }

  // Consume the formation on board? 
  // Standard rules: usually yes, or you have to rebuild it.
  // Implementation: We force a re-check which will fail if we destroy tiles, 
  // but if we don't destroy tiles, you could spam click.
  // WE MUST DESTROY TILES or require re-formation.
  // Let's destroy the tiles involved in the formation (set value to 0, player null).
  // Or just set them to value 0 (voiding them).
  // Let's iterate the match and clear tiles.
  
  const {x: sx, y: sy, rotation} = state.match;
  const gridDef = getRotatedPattern(pattern.grid, rotation);
  for(let y=0;y<gridDef.length;y++){
    for(let x=0;x<gridDef[y].length;x++){
      if(gridDef[y][x] > 0){
        const gx = sx + x;
        const gy = sy + y;
        const t = grid[gx][gy];
        if(t && t.player === playerIdx){
          // Reduce value or remove? "Sacrifice" usually means remove.
          // Let's remove them.
          const before = snapshotTileState(t);
          t.value = 0;
          t.player = null;
          t.currentScale = 0;
          tilesCount[playerIdx] = Math.max(0, tilesCount[playerIdx]-1);
          updateTileGraphics(t);
          logTileChange(gx, gy, before, snapshotTileState(t), 'factory_consume');
        }
      }
    }
  }
  
  state.match = null;
  state.ready = false;
  
  updatePowerupUI();
  updateLeaderboard();
  renderFactories(); // Re-render to show new random card or reset state
  renderFormationOverlay();
}

function renderFormationOverlay(){
  if(!formationOverlayLayer) return;
  formationOverlayLayer.removeChildren();
  if(!tilesOfWarEnabled || powerupCostMode !== 'formations' || setupPhase) return;
  const state = getFormationState(turnPlayer);
  if(!state.match) return;
  const {name, x, y, rotation} = state.match;
  const pattern = formationPatterns.find(p => p.name === name);
  if(!pattern) return;
  const grid = getRotatedPattern(pattern.grid, rotation);
  const g = new PIXI.Graphics();
  const lineColor = state.ready ? 0xffffff : 0xe5e7eb;
  const alpha = state.ready ? 0.9 : 0.6;
  const corner = Math.max(3, getTileCornerRadius() - 2);
  const pad = Math.max(3, Math.round(tileSize * 0.08));
  g.lineStyle(2, lineColor, alpha);
  for(let yy=0;yy<grid.length;yy++){
    for(let xx=0;xx<grid[yy].length;xx++){
      const req = grid[yy][xx];
      if(req <= 0) continue;
      const gx = x + xx;
      const gy = y + yy;
      g.drawRoundedRect(gx * tileSize + pad, gy * tileSize + pad, tileSize - pad * 2, tileSize - pad * 2, corner);
    }
  }
  formationOverlayLayer.addChild(g);
  const remaining = state.ready ? 'Ready' : `${3 - state.turnsStable}`;
  const label = new PIXI.Text(remaining, {
    fontFamily: 'Arial',
    fontSize: Math.max(10, Math.round(tileSize * 0.4)),
    fill: lineColor,
    stroke: 0x111111,
    strokeThickness: 2
  });
  label.x = x * tileSize + 4;
  label.y = y * tileSize + 4;
  formationOverlayLayer.addChild(label);
}
function renderFactories(){
  if(!factoriesPanel) return;
  factoriesPanel.innerHTML = '';
  
  if(!tilesOfWarEnabled || powerupCostMode !== 'factories'){
    factoriesPanel.style.display = 'none';
    return;
  }
  factoriesPanel.style.display = 'flex';

  const playerIdx = turnPlayer;
  const state = getFormationState(playerIdx);
  
  const indicesToShow = [];
  if(factoryMode === 'choose'){
    for(let i=0; i<formationPatterns.length; i++) indicesToShow.push(i);
  } else {
    if(assignedFactories[playerIdx] !== null) indicesToShow.push(assignedFactories[playerIdx]);
  }

  indicesToShow.forEach(idx => {
    const pattern = formationPatterns[idx];
    if(!pattern) return;
    
    const card = document.createElement('div');
    card.className = 'factory-card';
    
    const isMatched = state.match && state.match.name === pattern.name;
    if(isMatched) {
      card.classList.add('active');
      card.classList.add('ready');
      card.onclick = () => claimFactory(playerIdx, idx);
    } else {
       card.classList.add('disabled');
    }

    const title = document.createElement('div');
    title.className = 'factory-title';
    title.textContent = pattern.name;
    
    const gridEl = document.createElement('div');
    gridEl.className = 'factory-grid';
    // Find dimensions
    const pGrid = pattern.grid;
    const h = pGrid.length;
    const w = pGrid[0].length;
    gridEl.style.gridTemplateColumns = `repeat(${w}, 18px)`;
    gridEl.style.gridTemplateRows = `repeat(${h}, 18px)`;
    
    for(let y=0; y<h; y++){
      for(let x=0; x<w; x++){
        const cell = document.createElement('div');
        cell.className = 'factory-cell';
        const val = pGrid[y][x];
        if(val > 0) {
          cell.classList.add('filled');
          if(val === 3) cell.classList.add('core');
          cell.textContent = val;
        }
        gridEl.appendChild(cell);
      }
    }
    
    const status = document.createElement('div');
    status.className = 'factory-status';
    status.textContent = isMatched ? "CLAIM" : "";
    
    card.appendChild(title);
    card.appendChild(gridEl);
    card.appendChild(status);
    
    factoriesPanel.appendChild(card);
  });
}

function updatePowerupUI(){
  if(factoriesPanel) renderFactories(); // Sync factories whenever UI updates
  if(!powerupBar) return;
  const anyEnabled = tilesOfWarEnabled && Object.values(powerupEnabled || {}).some(Boolean);
  if(!tilesOfWarEnabled || !anyEnabled){
    powerupBar.style.display = 'none';
    return;
  }
  powerupBar.style.display = 'flex';
  
  let baseReady = false;
  if(tilesOfWarEnabled && !turnInProgress && !pendingPowerAction){
    if(powerupCostMode === 'factories'){
       baseReady = (powerupCredits[turnPlayer] > 0);
    } else if(powerupCostMode === 'formations'){
       baseReady = getFormationState(turnPlayer).ready;
    } else {
       baseReady = playerHasLevel3(turnPlayer);
    }
  }

  if(activePowerup && (!baseReady || !powerupEnabled[activePowerup] || getPowerCooldown(turnPlayer, activePowerup) > 0)){
    activePowerup = null;
  }
  [powerupRomboidBtn,powerupViewfinderBtn,powerupWallBtn,powerupSkipBtn].forEach(btn=>{
    if(!btn) return;
    const id = btn.id === 'powerupRomboid'
      ? 'romboid'
      : (btn.id==='powerupViewfinder' ? 'viewfinder' : (btn.id==='powerupWall' ? 'wall' : 'skip'));
    if(!powerupEnabled[id]){
      btn.style.display = 'none';
      return;
    }
    btn.style.display = '';
    const readyThis = baseReady && getPowerCooldown(turnPlayer, id) <= 0;
    btn.disabled = !readyThis;
    btn.classList.remove('active');
    
    // Add text for credits if needed
    if(powerupCostMode === 'factories' && readyThis){
       btn.title = `Credits available: ${powerupCredits[turnPlayer]}`;
    }
  });
  if(activePowerup==='romboid' && powerupRomboidBtn) powerupRomboidBtn.classList.add('active');
  if(activePowerup==='viewfinder' && powerupViewfinderBtn) powerupViewfinderBtn.classList.add('active');
  if(activePowerup==='wall' && powerupWallBtn) powerupWallBtn.classList.add('active');
  if(activePowerup==='skip' && powerupSkipBtn) powerupSkipBtn.classList.add('active');
  if(powerupCooldownHint){
    const cdR = getPowerCooldown(turnPlayer,'romboid');
    const cdV = getPowerCooldown(turnPlayer,'viewfinder');
    const cdW = getPowerCooldown(turnPlayer,'wall');
    const cdS = getPowerCooldown(turnPlayer,'skip');
    let text = '';
    if(powerupCooldownMode === 'perPower'){
      const parts = [];
      if(cdR>0) parts.push(`R:${cdR}`);
      if(cdV>0) parts.push(`V:${cdV}`);
      if(cdW>0) parts.push(`W:${cdW}`);
      if(cdS>0) parts.push(`S:${cdS}`);
      text = parts.length ? `Cooldowns ${parts.join(' ')}` : '';
    } else {
      const cd = powerupCooldowns[turnPlayer]||0;
      text = cd>0 ? `Cooldown: ${cd}` : '';
    }
    if(powerupCostMode === 'factories'){
       text += ` | Credits: ${powerupCredits[turnPlayer]}`;
    }
    powerupCooldownHint.textContent = text;
  }
}

function postNews(text, color){
  if(!newsFeed || !newsEnabled) return;
  const atBottom = (newsFeed.scrollTop + newsFeed.clientHeight) >= (newsFeed.scrollHeight - 8);
  const item = document.createElement('div'); item.className = 'news-item';
  const dot = document.createElement('span'); dot.className = 'news-dot'; dot.style.backgroundColor = `#${color.toString(16).padStart(6,'0')}`;
  const content = document.createElement('div'); content.className = 'news-text'; content.textContent = text;
  const meta = document.createElement('div'); meta.className = 'news-meta'; const ts = new Date(); meta.textContent = ts.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  item.appendChild(dot); item.appendChild(content); item.appendChild(meta);
  newsFeed.appendChild(item);
  while(newsFeed.children.length > 100){
    newsFeed.removeChild(newsFeed.firstElementChild);
  }
  if(atBottom) { newsFeed.scrollTop = newsFeed.scrollHeight; }
}

const phrases = {
  border: ["reinforces the border","fortifies the frontier","commissions new outposts","builds a very tasteful fence","posts customs officers","raises watchtowers","inspects the ramparts","patrols the periphery","seals a leaky checkpoint","lines the edge with sandbags","trenches along the limit","lays down border markers"],
  internal: ["balances the budget","approves an infrastructure bill","cuts ribbons on new schools","stimulates the economy","audits public accounts","renegotiates trade deals","passes a healthcare reform","modernizes railways","subsidizes local farmers","funds a cultural festival","streamlines civil service","opens parks and libraries"],
  frontlineWar: [
    "fortifies positions facing %ENEMY%","prepares defenses along the %ENEMY% line","moves reserves to the %ENEMY% front","tests the border with %ENEMY% patrols",
    "sets up blockades near %ENEMY%","stacks ammo crates opposite %ENEMY%","digs foxholes across from %ENEMY%","reinforces the barricades against %ENEMY%",
    "places artillery markers toward %ENEMY%","strings wire on the %ENEMY% side"
  ],
  frontlineDiplo: [
    "opens a hotline with %ENEMY%","floats a ceasefire to %ENEMY%","sends a delegation to %ENEMY%","files paperwork with %ENEMY% customs",
    "hosts tea at the %ENEMY% checkpoint","tenders a trade deal to %ENEMY%","proposes a demilitarized strip with %ENEMY%","exchanges observers with %ENEMY%",
    "schedules talks near %ENEMY% fences","drafts a protocol for %ENEMY% crossings"
  ],
  verbsBoom: ["detonates", "erupts", "ignites", "blows up", "bursts", "sets off", "uncorks", "triggers", "unleashes", "lights the fuse"],
  verbsCapture: ["seizes", "annexes", "liberates", "absorbs", "claims", "commandeers", "appropriates", "snatches", "captures", "overwhelms"],
  twists: [
    "in an exciting change of front",
    "with diplomatic flair",
    "to the dismay of the neighbors",
    "while the commentators pretend to be impartial",
    "and nobody saw it coming",
    "with a wink to history",
    "as the crowd politely gasps",
    "in a move some will call 'bold'",
    "and the pundits will argue for weeks",
    "with absolutely no chill"
  ],
  quietEnds: [],
  boomEnds: [
    "The chamber shakes, the gallery loves it.",
    "Filibusters scatter like confetti.",
    "The senate snack bar closes early.",
    "Somewhere, a poll swings wildly.",
    "An amendment explodes in committee.",
    "Debates postponed: too loud.",
    "A dramatic reading of 'kaboom'.",
    "Analysts add extra exclamation points.",
    "The map gets new exclamation marks.",
    "History teachers take notes."
  ],
  captureEnds: [
    "Borders rewritten before the ink dries.",
    "A referendum conducted at orb-speed.",
    "Diplomacy by other means.",
    "New flags over old offices.",
    "Cartographers file for overtime.",
    "Annexation with excellent penmanship.",
    "Press conference at eleven.",
    "Opposition vows a strongly worded letter.",
    "A coalition forms, then explodes.",
    "Historians flip to a fresh page."
  ],
  idle: [
    "does nothing… or so it seems…",
    "takes a contemplative pause. Dramatic.",
    "stares at the map until the map blinks.",
    "delays, to build suspense (and anxiety).",
    "filibusters their own turn.",
    "lets the moment pass like a budget vote.",
    "checks the polls, twice.",
    "commissions a study. It will be long.",
    "sends thoughts and prayers to the frontier.",
    "strategizes by not strategizing."
  ]
};

// Game record tracking for chain reactions
let bestChainExplosions = 0;
let bestChainCaptures = 0;
let bestChainOwner = null;

function buildCommentaryLine(stats){
  const team = getColorName(stats.player);
  const place = stats.region;
  const twist = pick(phrases.twists);
  if(stats.explosions > 1){
    const v = pick(phrases.verbsBoom);
    const end = pick(phrases.boomEnds);
    const recordNote = recordDescriptor(stats);
    const capturedNote = buildCaptureBreakdown(stats);
    const elimNote = buildEliminationNote(stats);
    const keg = stats.powderKeg ? " The front was a powder keg." : "";
    return `${team} ${v} a chain in ${place}, ${twist}. ${chainDescriptor(stats.explosions)}${capturedNote}${elimNote}${keg} ${end}`.trim();
  }
  if(stats.explosions === 1){
    const v = pick(phrases.verbsBoom);
    const end = pick(phrases.boomEnds);
    const capturedNote = buildCaptureBreakdown(stats);
    const elimNote = buildEliminationNote(stats);
    const keg = stats.powderKeg ? " The situation looks volatile." : "";
    return `${team} ${v} in ${place}${capturedNote ? ' — ' + capturedNote : ''}, ${twist}.${elimNote}${keg} ${end}`.trim();
  }
  if(stats.captures > 0){
    const cap = pick(phrases.verbsCapture);
    const end = pick(phrases.captureEnds);
    const bd = buildCaptureBreakdown(stats, cap);
    const elimNote = buildEliminationNote(stats);
    return `${team} ${bd} in ${place}, ${twist}.${elimNote} ${end}`.trim();
  }
  if(stats.neighborEnemies && stats.neighborEnemies.length > 0){
    const enemyIdx = pick(stats.neighborEnemies);
    const enemyName = getColorName(enemyIdx);
    const useWar = Math.random() < 0.6;
    const arr = useWar ? phrases.frontlineWar : phrases.frontlineDiplo;
    const templ = pick(arr).replace(/%ENEMY%/g, enemyName);
    return `${team} ${templ} in ${place}.`;
  }
  if(stats.isEdge){
    const v = pick(phrases.border);
    return `${team} ${v} along ${place}.`;
  }
  const v2 = pick(phrases.internal);
  const endings = [
    "Budgets balanced, for now.","Technocrats smile politely.","Progress without fireworks.","A quiet win at home.",
    "The economy applauds softly.","Accountants ring tiny bells.","Policy over bravado.","Auditors take notes.","Roads get smoother.","Citizens sip coffee contentedly."
  ];
  return `${team} ${v2}. ${pick(endings)}`;
}

function buildIdleCommentary(playerIndex){
  const team = getColorName(playerIndex);
  const msg = pick(phrases.idle);
  return `${team} ${msg}`;
}

function chainDescriptor(n){
  if(n >= 6) return "A parliamentary fireworks show.";
  if(n >= 4) return "Committees dissolve in a lovely cascade.";
  if(n >= 3) return "A tidy chain reaction shakes the docket.";
  return "A brief but spirited boom.";
}

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function buildCaptureBreakdown(stats, verbOverride){
  if(!stats || stats.captures <= 0) return '';
  const parts = [];
  const total = stats.captures;
  const keys = Object.keys(stats.captureCounts);
  keys.forEach(k => {
    const c = stats.captureCounts[k];
    const color = getColorName(parseInt(k,10));
    parts.push(`${c} ${color}`);
  });
  let phrase;
  if(parts.length === 0){
    phrase = `${verbOverride||'capturing'} ${total} tile${total>1?'s':''}`;
  } else if(parts.length === 1){
    phrase = `${verbOverride||'capturing'} ${parts[0]} tile${total>1?'s':''}`;
  } else if(parts.length === 2){
    phrase = `${verbOverride||'capturing'} ${parts[0]} tile${stats.captureCounts[keys[0]]>1?'s':''} and ${parts[1]} tile${stats.captureCounts[keys[1]]>1?'s':''} (total ${total})`;
  } else {
    const last = parts.pop();
    phrase = `${verbOverride||'capturing'} ${parts.join(', ')} and ${last} tiles (total ${total})`;
  }
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

function buildEliminationNote(stats){
  if(!stats || !stats.eliminatedPlayers || stats.eliminatedPlayers.length === 0) return '';
  const names = stats.eliminatedPlayers.map(getColorName);
  let tail = '';
  if(names.length === 1){ tail = ` Eliminating ${names[0]}.`; }
  else if(names.length === 2){ tail = ` Eliminating ${names[0]} and ${names[1]}.`; }
  else { tail = ` Eliminating ${names.slice(0,-1).join(', ')} and ${names[names.length-1]}.`; }
  return tail;
}

function recordDescriptor(stats){
  if(stats.explosions <= 1) return '';
  let note = '';
  let isRecord = false;
  if(stats.captures > bestChainCaptures){
    bestChainCaptures = stats.captures;
    bestChainExplosions = Math.max(bestChainExplosions, stats.explosions);
    bestChainOwner = stats.player;
    isRecord = true;
  } else if(stats.captures === bestChainCaptures && stats.explosions > bestChainExplosions){
    bestChainExplosions = stats.explosions;
    bestChainOwner = stats.player;
    isRecord = true;
  }
  if(isRecord){ note = ` New game record!`; }
  else if(bestChainCaptures > 0 && bestChainOwner === stats.player && stats.captures === bestChainCaptures && stats.explosions === bestChainExplosions){ note = ` (ties their own record)`; }
  return note;
}

/* ----------------------------------------------------------------
   1) SETUP MENU
---------------------------------------------------------------- */
playerSelect.onchange = () => {
  let selectedPlayers = parseInt(playerSelect.value, 10);
  if(isNaN(selectedPlayers)) selectedPlayers = 2;
  selectedPlayers = Math.max(2, Math.min(maxSelectablePlayers, selectedPlayers));
  playerSelect.value = String(selectedPlayers);
  aiPlayerSelect.innerHTML = '';
  for(let i = 0; i <= selectedPlayers; i++){
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    aiPlayerSelect.appendChild(option);
  }
};
if(playerSelect){
  playerSelect.addEventListener('input', () => {
    playerSelect.dispatchEvent(new Event('change'));
  });
}
window.onload = () => {
  // Esegui la prima volta per forzare l'aggiornamento del numero di AI disponibili
  playerSelect.dispatchEvent(new Event('change'));
  // Sync numbers toggle on load (default unchecked)
  showNumbers = !!toggleNumbersCheckbox.checked;
  
  // Default to Local UI
  if(netModeToggle) netModeToggle.textContent = 'Local (offline)';

  setNetUI();
  attachHostSyncListeners();
};

// Presets for quick setup
function applyPresetBase(){
  widthSelect.value = '10';
  heightSelect.value = '10';
  playerSelect.value = '4';
  playerSelect.dispatchEvent(new Event('change'));
  aiPlayerSelect.value = '3';
}
function renderPresetPreview(width, height, seeds, label){
  if(!presetPreview) return;
  presetPreview.innerHTML = '';
  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = `${label} (${width}x${height})`;
  const gridEl = document.createElement('div');
  gridEl.className = 'preset-preview-grid';
  gridEl.style.gridTemplateColumns = `repeat(${width}, 8px)`;
  gridEl.style.gridTemplateRows = `repeat(${height}, 8px)`;
  const seedMap = new Map();
  (seeds||[]).forEach(s=>{
    seedMap.set(`${s.x},${s.y}`, s);
  });
  for(let y=0;y<height;y++){
    for(let x=0;x<width;x++){
      const cell = document.createElement('div');
      cell.className = 'preset-preview-cell';
      const key = `${x},${y}`;
      if(seedMap.has(key)){
        cell.classList.add('seed');
        const pid = seedMap.get(key).pid || 0;
        const col = possibleColors[pid % possibleColors.length];
        cell.style.backgroundColor = `#${col.toString(16).padStart(6,'0')}`;
      }
      gridEl.appendChild(cell);
    }
  }
  presetPreview.appendChild(title);
  presetPreview.appendChild(gridEl);
}
function renderSetupPreview(width, height, seeds, label){
  if(!setupPreview) return;
  setupPreview.innerHTML = '';
  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = `${label} (${width}x${height})`;
  const gridEl = document.createElement('div');
  gridEl.className = 'preset-preview-grid';
  gridEl.style.gridTemplateColumns = `repeat(${width}, 8px)`;
  gridEl.style.gridTemplateRows = `repeat(${height}, 8px)`;
  const seedMap = new Map();
  (seeds||[]).forEach(s=>{
    seedMap.set(`${s.x},${s.y}`, s);
  });
  for(let y=0;y<height;y++){
    for(let x=0;x<width;x++){
      const cell = document.createElement('div');
      cell.className = 'preset-preview-cell';
      const key = `${x},${y}`;
      if(seedMap.has(key)){
        cell.classList.add('seed');
        const pid = seedMap.get(key).pid || 0;
        const col = possibleColors[pid % possibleColors.length];
        cell.style.backgroundColor = `#${col.toString(16).padStart(6,'0')}`;
      }
      gridEl.appendChild(cell);
    }
  }
  setupPreview.appendChild(title);
  setupPreview.appendChild(gridEl);
}
function defaultPresetSeeds(width, height, players){
  const seeds = [];
  getEquidistantPositions(width, height, players).forEach((pos, idx)=>{
    if(!pos) return;
    seeds.push({x: pos.xx, y: pos.yy, pid: idx});
  });
  return seeds;
}
function geometricPresetSeeds(width, height, players){
  const seeds = [];
  getGeometricPositions(width, height, players).forEach((pos, idx)=>{
    if(!pos) return;
    seeds.push({x: pos.xx, y: pos.yy, pid: idx});
  });
  return seeds;
}
function geometric2PresetSeeds(width, height, players){
  const seeds = [];
  const positions = (players === 6)
    ? getGeometricPositionsEdgeSix(width, height)
    : getGeometricPositions(width, height, players);
  positions.forEach((pos, idx)=>{
    if(!pos) return;
    seeds.push({x: pos.xx, y: pos.yy, pid: idx});
  });
  return seeds;
}
function buildQuadrantPreviewSeeds(){
  const desiredValues = [4,4,4,3,3,2,2,1];
  const makePattern = ()=>{
    while(true){
      const placements=[]; let failed=false;
      for(const v of desiredValues){
        let placed=false;
        for(let attempt=0; attempt<200; attempt++){
          const dx = Math.floor(Math.random()*5);
          const dy = Math.floor(Math.random()*5);
          if(placements.some(p=>p.dx===dx && p.dy===dy)) continue;
          const touching = placements.some(p=> Math.abs(p.dx - dx) + Math.abs(p.dy - dy) <= 1);
          if(touching) continue;
          placements.push({dx, dy, v});
          placed=true; break;
        }
        if(!placed){ failed=true; break; }
      }
      if(!failed) return placements;
    }
  };
  const templates = makePattern();
  const rotate = (p, times)=>{
    let {dx,dy} = p;
    for(let i=0;i<times;i++){
      const ndx = 4 - dy;
      const ndy = dx;
      dx = ndx; dy = ndy;
    }
    return {dx, dy, v:p.v};
  };
  const offsets = [
    {ox:0, oy:0, rot:0},
    {ox:5, oy:0, rot:1}, // 90° cw
    {ox:0, oy:5, rot:3}, // 270° cw
    {ox:5, oy:5, rot:2}  // 180°
  ];
  const seeds=[];
  offsets.forEach((off, idx)=>{
    const pid = idx;
    templates.forEach(t=>{
      const r = rotate(t, off.rot);
      seeds.push({x: off.ox + r.dx, y: off.oy + r.dy, pid});
    });
  });
  return seeds;
}
const presetStandardBtn = document.getElementById('presetStandardBtn');
if(presetStandardBtn){
  presetStandardBtn.onclick = () => {
    applyPresetBase();
    if(roundsPerRingInput) roundsPerRingInput.value = '10';
    renderPresetPreview(10, 10, defaultPresetSeeds(10,10,4), 'Standard preset (inset starts)');
  };
}
const presetDebugBtn = document.getElementById('presetDebugBtn');
if(presetDebugBtn){
  presetDebugBtn.onclick = () => {
    applyPresetBase();
    if(roundsPerRingInput) roundsPerRingInput.value = '3';
    renderPresetPreview(10, 10, defaultPresetSeeds(10,10,4), 'Debug preset (inset starts)');
  };
}
if(presetChaos2PBtn){
  presetChaos2PBtn.onclick = () => {
    widthSelect.value = '10';
    heightSelect.value = '10';
    // playerSelect.value remains whatever it is (synced to peers or manually selected)
    if(netMode !== 'multi') playerSelect.value = '2'; 
    playerSelect.dispatchEvent(new Event('change'));
    aiPlayerSelect.value = '0';
    if(roundsPerRingInput) roundsPerRingInput.value = '3';
    if(shrinkCoverageToggle) shrinkCoverageToggle.checked = false;
    useChaosPreset = true;
    renderPresetPreview(10, 10, [], 'Chaos Preset (50% Filled)');
  };
}
const presetQuadrantSeedBtn = document.getElementById('presetQuadrantSeedBtn');
if(presetQuadrantSeedBtn){
  presetQuadrantSeedBtn.onclick = () => {
    applyPresetBase();
    widthSelect.value = '10';
    heightSelect.value = '10';
    playerSelect.value = '4';
    playerSelect.dispatchEvent(new Event('change'));
    aiPlayerSelect.value = '0';
    useQuadrantSeedPreset = true;
    renderPresetPreview(10, 10, buildQuadrantPreviewSeeds(), 'Quadrant seed preset');
  };
}
[setupSelect, widthSelect, heightSelect, playerSelect, preformToggle].forEach(el => {
  if(!el) return;
  el.addEventListener('change', () => updateSetupPreview());
});
updateSetupPreview();
if(netModeToggle){
  netModeToggle.onclick = ()=>{
    netMode = (netMode === 'multi' ? 'local' : 'multi');
    netModeToggle.textContent = (netMode === 'multi' ? 'Multiplayer' : 'Local (offline)');
    const show = netMode === 'multi';
    if(netButtons) netButtons.style.display = show ? 'flex' : 'none';
    if(netStatusRow) netStatusRow.style.display = show ? 'flex' : 'none';
    if(!show){ disconnectWs(); }
  };
}
if(createRoomBtn){ createRoomBtn.onclick = ()=> createRoom(); }
if(joinRoomBtn){ joinRoomBtn.onclick = ()=> joinRoom(roomCodeInput ? roomCodeInput.value.trim() : ''); }
if(netStatus){
  netStatus.onclick = ()=>{
    if(roomId){ copyRoomCode(roomId); }
  };
}
if(syncStateBtn){
  syncStateBtn.onclick = () => {
    if(netMode === 'multi' && isHost) {
      console.log("Manual Sync triggered by Host.");
      broadcastState();
      postNews("Host forced a state synchronization.", 0x1d4ed8);
    }
  };
}
function togglePowerSelection(power){
  if(isPaused) return;
  if(!powerupEnabled[power]) return;
  // cancel pending second step of the same power
  if(pendingPowerAction && pendingPowerAction.type === power){
    pendingPowerAction = null;
    clearWallPreview();
    updatePowerupUI();
    return;
  }
  // clicking again cancels selection
  if(activePowerup === power){
    activePowerup = null;
    pendingPowerAction = null;
    clearWallPreview();
    updatePowerupUI();
    return;
  }
  if(!canUsePower(power)) return;
  activePowerup = power;
  pendingPowerAction = null;
  clearWallPreview();
  updatePowerupUI();
}
if(powerupRomboidBtn){ powerupRomboidBtn.onclick = ()=> togglePowerSelection('romboid'); }
if(powerupViewfinderBtn){ powerupViewfinderBtn.onclick = ()=> togglePowerSelection('viewfinder'); }
if(powerupWallBtn){ powerupWallBtn.onclick = ()=> togglePowerSelection('wall'); }
if(powerupSkipBtn){ powerupSkipBtn.onclick = ()=> togglePowerSelection('skip'); }
if(pauseGameButton){ pauseGameButton.onclick = () => pauseGame(); }
function openReportOverlay(){
  if(!reportOverlay || !boardOverlay) return;
  if(pauseOverlay) pauseOverlay.classList.add('overlay-hidden');
  reportOverlay.classList.remove('overlay-hidden');
  if(reportReadout) reportReadout.textContent = "Hover a tile to see coordinates.";
  setBoardOverlayActive(true);
}

function updateSetupPreview(){
  if(!setupPreview || !setupSelect) return;
  const mode = setupSelect.value;
  const width = Math.max(4, parseInt(widthSelect.value, 10) || 4);
  const height = Math.max(4, parseInt(heightSelect.value, 10) || 4);
  const players = Math.max(2, Math.min(maxSelectablePlayers, parseInt(playerSelect.value, 10) || 2));
  const canPreform = width >= 11 && height >= 11 && mode !== 'manual';
  if(preformToggle){
    preformToggle.disabled = !canPreform;
    if(!canPreform) preformToggle.checked = false;
  }
  const resolvedMode = setupSelect.value;
  if(resolvedMode === 'manual'){
    setupPreview.innerHTML = '';
    if(preformToggle && preformToggle.checked){
      preformToggle.checked = false;
    }
    return;
  }
  const seeds = (resolvedMode === 'geometric')
    ? geometricPresetSeeds(width, height, players)
    : (resolvedMode === 'geometric2')
      ? geometric2PresetSeeds(width, height, players)
      : defaultPresetSeeds(width, height, players);
  const label = (resolvedMode === 'geometric')
    ? 'Geometric setup'
    : (resolvedMode === 'geometric2')
      ? 'Geometric 2 setup'
      : 'Automatic setup';
  renderSetupPreview(width, height, seeds, label);
  if(preformToggle && preformToggle.checked && !canPreform){
    const note = document.createElement('div');
    note.className = 'title';
    note.textContent = 'Formations require at least 11x11 and non-manual setup.';
    setupPreview.appendChild(note);
  }
}
function closeReportOverlay(){
  if(reportOverlay) reportOverlay.classList.add('overlay-hidden');
  setBoardOverlayActive(false);
  if(pauseOverlay) pauseOverlay.classList.remove('overlay-hidden');
  resizeBoardToFitViewport(true);
}
function captureGridSnapshot(){
  const snapshot = [];
  for(let x=0;x<gridWidthNum;x++){
    snapshot[x] = [];
    for(let y=0;y<gridHeightNum;y++){
      const t = grid[x][y];
      snapshot[x][y] = t ? {
        player: t.player,
        value: t.value,
        isRock: t.isRock,
        isVoid: t.isVoid,
        isExploding: t.isExploding,
        shape: t.shape
      } : null;
    }
  }
  return snapshot;
}
function reportBrokenTile(x, y){
  const tile = grid[x]?.[y];
  logEvent('report_broken_tile', {
    coord: `${colToLabel(x)}${y + 1}`,
    x, y,
    tile: tile ? {
      player: tile.player,
      value: tile.value,
      isRock: tile.isRock,
      isVoid: tile.isVoid,
      isExploding: tile.isExploding,
      shape: tile.shape
    } : null,
    turnPlayer,
    roundsCompleted,
    shrinkRoundsCompleted,
    turnsTaken,
    ringsApplied,
    shrinkGateReached,
    shrinkEnabled,
    shrinkAnimMode,
    gridWidthNum,
    gridHeightNum,
    tileSize,
    gridSnapshot: captureGridSnapshot()
  });
}
function exportDebugLog(){
  const payload = {
    exportedAt: new Date().toISOString(),
    meta: {
      gridWidthNum,
      gridHeightNum,
      tileSize,
      roundsCompleted,
      shrinkRoundsCompleted,
      turnsTaken,
      ringsApplied,
      shrinkGateReached,
      shrinkEnabled,
      shrinkAnimMode
    },
    events: debugLog
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tileswars-debug-log-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
if(resumeBtn){ resumeBtn.onclick = () => resumeGame(); }
if(pauseRestartBtn){ pauseRestartBtn.onclick = () => openConfirmOverlay('restart'); }
if(pauseExitBtn){ pauseExitBtn.onclick = () => openConfirmOverlay('exit'); }
if(replayLastMoveBtn){ replayLastMoveBtn.onclick = () => replayLastMove(); }
if(reportTileBtn){ reportTileBtn.onclick = () => openReportOverlay(); }
if(exportLogBtn){ exportLogBtn.onclick = () => exportDebugLog(); }
if(reportCancelBtn){ reportCancelBtn.onclick = () => closeReportOverlay(); }
if(downloadLogsBtn){ downloadLogsBtn.onclick = () => exportDebugLog(); }
if(boardOverlay){
  boardOverlay.addEventListener('pointermove', (evt) => {
    const coord = getTileFromOverlayEvent(evt);
    if(!coord || !reportReadout){
      if(reportReadout) reportReadout.textContent = "Hover a tile to see coordinates.";
      return;
    }
    reportReadout.textContent = `Selected: ${colToLabel(coord.x)}${coord.y + 1}`;
  });
  boardOverlay.addEventListener('pointerdown', (evt) => {
    const coord = getTileFromOverlayEvent(evt);
    if(!coord) return;
    reportBrokenTile(coord.x, coord.y);
    if(reportReadout) reportReadout.textContent = `Saved: ${colToLabel(coord.x)}${coord.y + 1}`;
    closeReportOverlay();
  });
}
if(confirmYesBtn){
  confirmYesBtn.onclick = () => {
    if(pendingConfirmAction === 'restart' || pendingConfirmAction === 'exit'){
      restartGame();
    }
    closeConfirmOverlay();
  };
}
function updatePowerupOptionsVisibility(){
  if(!powerupOptionsWrap || !tilesOfWarToggle) return;
  const show = !!tilesOfWarToggle.checked;
  powerupOptionsWrap.setAttribute('aria-hidden', show ? 'false' : 'true');
}
function updateNewsVisibility(){
  if(!newsBox) return;
  const show = !!newsEnabled && !!gameDiv && gameDiv.style.display !== 'none';
  newsBox.style.display = show ? 'flex' : 'none';
  newsBox.setAttribute('aria-hidden', show ? 'false' : 'true');
  if(!show && newsFeed) newsFeed.innerHTML = '';
}
function initPreformState(){
  preformState.selectedIndex = 0;
  preformState.rotation = 0;
  preformState.placed = new Array(totalPlayers).fill(false);
  preformState.randomPatterns = [
    generateRandomPattern(19, 5),
    generateRandomPattern(19, 5)
  ];
  preformPatterns.forEach((p) => {
    if(p.name === 'Random A') p.grid = normalizePattern(preformState.randomPatterns[0]);
    if(p.name === 'Random B') p.grid = normalizePattern(preformState.randomPatterns[1]);
  });
}
function getPatternByIndex(idx){
  const p = preformPatterns[idx % preformPatterns.length];
  return {name: p.name, grid: normalizePattern(p.grid)};
}
function getRotatedPattern(grid, rotation){
  let out = normalizePattern(grid);
  const turns = ((rotation % 4) + 4) % 4;
  for(let i=0;i<turns;i++){
    out = rotatePattern(out);
  }
  return out;
}
function renderPreformPreview(){
  if(!preformPreview || !preformTitle) return;
  const {name, grid} = getPatternByIndex(preformState.selectedIndex);
  const rotated = getRotatedPattern(grid, preformState.rotation);
  preformTitle.textContent = `${name} • Sum ${sumPattern(rotated)}`;
  preformPreview.innerHTML = '';
  for(let y=0;y<rotated.length;y++){
    for(let x=0;x<rotated[y].length;x++){
      const cell = document.createElement('div');
      cell.className = 'preform-cell';
      const v = rotated[y][x];
      if(v > 0){
        cell.classList.add('active');
        cell.textContent = String(v);
      }
      preformPreview.appendChild(cell);
    }
  }
}
function togglePreformMenu(show){
  if(!preformMenu) return;
  preformMenu.setAttribute('aria-hidden', show ? 'false' : 'true');
  if(show) renderPreformPreview();
}
function computePreformRegionsFromCenters(centers){
  preformRegions = Array.from({length: gridWidthNum}, () => Array(gridHeightNum).fill(-1));
  const half = 2;
  centers.forEach((c, idx) => {
    if(!c) return;
    for(let dx = -half; dx <= half; dx++){
      for(let dy = -half; dy <= half; dy++){
        const gx = c.xx + dx;
        const gy = c.yy + dy;
        if(gx < 0 || gy < 0 || gx >= gridWidthNum || gy >= gridHeightNum) continue;
        const prev = preformRegions[gx][gy];
        if(prev === -1){
          preformRegions[gx][gy] = idx;
        } else if(prev !== idx){
          preformRegions[gx][gy] = -1;
        }
      }
    }
  });
}
function normalizePreformCenters(centers){
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const minX = 2;
  const maxX = Math.max(2, gridWidthNum - 3);
  const minY = 2;
  const maxY = Math.max(2, gridHeightNum - 3);
  const normalized = centers.map(c => {
    if(!c) return null;
    return {
      xx: clamp(c.xx, minX, maxX),
      yy: clamp(c.yy, minY, maxY)
    };
  });
  const overlaps = (a, b) => Math.abs(a.xx - b.xx) <= 4 && Math.abs(a.yy - b.yy) <= 4;
  let moved = true;
  let guard = 0;
  while(moved && guard < 50){
    moved = false;
    guard++;
    for(let i=0;i<normalized.length;i++){
      const cur = normalized[i];
      if(!cur) continue;
      for(let j=0;j<i;j++){
        const other = normalized[j];
        if(!other) continue;
        if(!overlaps(cur, other)) continue;
        const dx = cur.xx - other.xx;
        const dy = cur.yy - other.yy;
        if(Math.abs(dx) >= Math.abs(dy)){
          cur.xx = clamp(cur.xx + (dx >= 0 ? 1 : -1), minX, maxX);
        } else {
          cur.yy = clamp(cur.yy + (dy >= 0 ? 1 : -1), minY, maxY);
        }
        moved = true;
      }
    }
  }
  return normalized;
}
function getSetupSpawnCenters(){
  if(setupMode === 'geometric'){
    return getGeometricPositions(gridWidthNum, gridHeightNum, totalPlayers);
  }
  if(setupMode === 'geometric2'){
    return (totalPlayers === 6)
      ? getGeometricPositionsEdgeSix(gridWidthNum, gridHeightNum)
      : getGeometricPositions(gridWidthNum, gridHeightNum, totalPlayers);
  }
  return getEquidistantPositions(gridWidthNum, gridHeightNum, totalPlayers);
}
function canPlacePreformAt(playerIdx, anchorX, anchorY, pattern){
  const size = pattern.length;
  const offset = Math.floor(size / 2);
  for(let y=0;y<size;y++){
    for(let x=0;x<size;x++){
      const v = pattern[y][x];
      if(v <= 0) continue;
      const gx = anchorX + (x - offset);
      const gy = anchorY + (y - offset);
      if(gx < 0 || gy < 0 || gx >= gridWidthNum || gy >= gridHeightNum) return false;
      if(preformRegions[gx]?.[gy] !== playerIdx) return false;
      const tile = grid[gx][gy];
      if(!tile || tile.isRock || tile.isVoid) return false;
      if(tile.player !== null || tile.value > 0) return false;
    }
  }
  return true;
}
function placePreformAt(playerIdx, anchorX, anchorY, pattern){
  const size = pattern.length;
  const offset = Math.floor(size / 2);
  for(let y=0;y<size;y++){
    for(let x=0;x<size;x++){
      const v = pattern[y][x];
      if(v <= 0) continue;
      const gx = anchorX + (x - offset);
      const gy = anchorY + (y - offset);
      const tile = grid[gx][gy];
      if(!tile) continue;
      const before = snapshotTileState(tile);
      tile.player = playerIdx;
      tile.value = v;
      tile.currentScale = getScaleForValue(v);
      tile.currentColor = playerColors[playerIdx];
      tile.shape = 'circle';
      updateTileGraphics(tile);
      logTileChange(gx, gy, before, snapshotTileState(tile), 'preform_place');
      tilesCount[playerIdx]++;
    }
  }
  updateLeaderboard();
}
function renderPreformOverlay(anchor){
  if(!preformOverlayLayer){
    preformHoverAnchor = anchor ? {x: anchor.x, y: anchor.y} : null;
    return;
  }
  preformOverlayLayer.clear();
  preformHoverAnchor = anchor ? {x: anchor.x, y: anchor.y} : null;
  if(!preformEnabled || !setupPhase) return;
  const playerIdx = turnPlayer;
  const baseColor = playerColors[playerIdx] ?? 0x666666;
  const corner = Math.max(3, getTileCornerRadius() - 3);
  const inset = Math.max(3, Math.round(tileSize * 0.12));
  preformOverlayLayer.beginFill(baseColor, 0.08);
  for(let x=0;x<gridWidthNum;x++){
    for(let y=0;y<gridHeightNum;y++){
      if(preformRegions[x]?.[y] !== playerIdx) continue;
      preformOverlayLayer.drawRoundedRect(x * tileSize + 1, y * tileSize + 1, tileSize - 2, tileSize - 2, corner);
    }
  }
  preformOverlayLayer.endFill();
  if(!preformHoverAnchor) return;
  const {grid: baseGrid} = getPatternByIndex(preformState.selectedIndex);
  const pattern = getRotatedPattern(baseGrid, preformState.rotation);
  const canPlace = canPlacePreformAt(playerIdx, preformHoverAnchor.x, preformHoverAnchor.y, pattern);
  const ghostColor = canPlace ? baseColor : 0xff4d4d;
  const ghostAlpha = canPlace ? 0.25 : 0.22;
  preformOverlayLayer.beginFill(ghostColor, ghostAlpha);
  const size = pattern.length;
  const offset = Math.floor(size / 2);
  const innerCorner = Math.max(2, corner - 2);
  for(let y=0;y<size;y++){
    for(let x=0;x<size;x++){
      const v = pattern[y][x];
      if(v <= 0) continue;
      const gx = preformHoverAnchor.x + (x - offset);
      const gy = preformHoverAnchor.y + (y - offset);
      if(gx < 0 || gy < 0 || gx >= gridWidthNum || gy >= gridHeightNum) continue;
      preformOverlayLayer.drawRoundedRect(
        gx * tileSize + inset,
        gy * tileSize + inset,
        tileSize - inset * 2,
        tileSize - inset * 2,
        innerCorner
      );
    }
  }
  preformOverlayLayer.endFill();
}
function colToLabel(idx){
  let n = idx + 1;
  let label = '';
  while(n > 0){
    const rem = (n - 1) % 26;
    label = String.fromCharCode(65 + rem) + label;
    n = Math.floor((n - 1) / 26);
  }
  return label;
}
function buildBoardOverlayLabels(){
  if(!boardOverlayTop || !boardOverlayLeft) return;
  boardOverlayTop.innerHTML = '';
  boardOverlayLeft.innerHTML = '';
  const labelSize = 18;
  boardOverlayTop.style.height = `${labelSize}px`;
  boardOverlayTop.style.top = `${-labelSize}px`;
  boardOverlayLeft.style.width = `${labelSize}px`;
  boardOverlayLeft.style.left = `${-labelSize}px`;
  for(let x = 0; x < gridWidthNum; x++){
    const span = document.createElement('span');
    span.style.width = `${tileSize}px`;
    span.style.height = `${labelSize}px`;
    span.textContent = colToLabel(x);
    boardOverlayTop.appendChild(span);
  }
  for(let y = 0; y < gridHeightNum; y++){
    const span = document.createElement('span');
    span.style.height = `${tileSize}px`;
    span.style.width = `${labelSize}px`;
    span.textContent = String(y + 1);
    boardOverlayLeft.appendChild(span);
  }
}
function updateBoardOverlayLayout(){
  if(!boardOverlay || !pixiContainer || !gameDiv) return;
  const boardRect = pixiContainer.getBoundingClientRect();
  const gameRect = gameDiv.getBoundingClientRect();
  boardOverlay.style.left = `${boardRect.left - gameRect.left}px`;
  boardOverlay.style.top = `${boardRect.top - gameRect.top}px`;
  boardOverlay.style.width = `${boardRect.width}px`;
  boardOverlay.style.height = `${boardRect.height}px`;
  if(boardOverlayGrid){
    boardOverlayGrid.style.backgroundSize = `${tileSize}px ${tileSize}px`;
  }
  buildBoardOverlayLabels();
}
function setBoardOverlayActive(active){
  if(!boardOverlay) return;
  if(active){
    resizeBoardToFitViewport(false);
    updateBoardOverlayLayout();
    boardOverlay.classList.add('active');
    boardOverlay.setAttribute('aria-hidden', 'false');
  } else {
    boardOverlay.classList.remove('active');
    boardOverlay.setAttribute('aria-hidden', 'true');
  }
}
function getTileFromOverlayEvent(evt){
  if(!boardOverlay) return null;
  const rect = boardOverlay.getBoundingClientRect();
  const relX = evt.clientX - rect.left;
  const relY = evt.clientY - rect.top;
  if(relX < 0 || relY < 0) return null;
  const x = Math.floor(relX / tileSize);
  const y = Math.floor(relY / tileSize);
  if(x < 0 || y < 0 || x >= gridWidthNum || y >= gridHeightNum) return null;
  return {x, y};
}
  if(tilesOfWarToggle){
  tilesOfWarToggle.addEventListener('change', () => {
    updatePowerupOptionsVisibility();
    updatePowerupUI();
  });
}
if(newsToggle){
  newsToggle.addEventListener('change', () => {
    newsEnabled = !!newsToggle.checked;
    updateNewsVisibility();
  });
}
if(powerupRomboidToggle){ powerupRomboidToggle.addEventListener('change', () => updatePowerupUI()); }
if(powerupViewfinderToggle){ powerupViewfinderToggle.addEventListener('change', () => updatePowerupUI()); }
if(powerupWallToggle){ powerupWallToggle.addEventListener('change', () => updatePowerupUI()); }
if(powerupSkipToggle){ powerupSkipToggle.addEventListener('change', () => updatePowerupUI()); }
updatePowerupOptionsVisibility();
updateNewsVisibility();
if(preformPrevBtn){
  preformPrevBtn.onclick = () => {
    preformState.selectedIndex = (preformState.selectedIndex - 1 + preformPatterns.length) % preformPatterns.length;
    renderPreformPreview();
    renderPreformOverlay(preformHoverAnchor);
  };
}
if(preformNextBtn){
  preformNextBtn.onclick = () => {
    preformState.selectedIndex = (preformState.selectedIndex + 1) % preformPatterns.length;
    renderPreformPreview();
    renderPreformOverlay(preformHoverAnchor);
  };
}
if(preformRotateBtn){
  preformRotateBtn.onclick = () => {
    preformState.rotation = (preformState.rotation + 1) % 4;
    renderPreformPreview();
    renderPreformOverlay(preformHoverAnchor);
  };
}
if(confirmNoBtn){ confirmNoBtn.onclick = () => closeConfirmOverlay(); }

function openConfirmOverlay(action){
  pendingConfirmAction = action;
  if(confirmTitle) confirmTitle.textContent = "Are you sure?";
  if(confirmMessage){
    confirmMessage.textContent = action === 'restart'
      ? "Are you sure you want to restart?"
      : "Are you sure you want to exit?";
  }
  if(confirmOverlay){
    confirmOverlay.classList.remove('overlay-hidden');
  }
}

function closeConfirmOverlay(){
  pendingConfirmAction = null;
  if(confirmOverlay){
    confirmOverlay.classList.add('overlay-hidden');
  }
}

function pauseGame(){
  if(isPaused) return;
  isPaused = true;
  if(turnTimerTimeoutId) clearTimeout(turnTimerTimeoutId);
  if(turnTimerIntervalId) clearInterval(turnTimerIntervalId);
  if(suddenDeathIntervalId) clearInterval(suddenDeathIntervalId);
  if(turnWatchdog) clearTimeout(turnWatchdog);
  if(aiMoveTimeoutId){
    clearTimeout(aiMoveTimeoutId);
    aiMoveTimeoutId = null;
  }
  if(isAIPlayer[turnPlayer]){
    pendingAIMovePlayer = turnPlayer;
  }
  gsap.globalTimeline.pause();
  if(gameDiv) gameDiv.classList.add('paused');
  if(pauseOverlay) pauseOverlay.classList.remove('overlay-hidden');
}

function resumeGame(){
  if(!isPaused) return;
  isPaused = false;
  gsap.globalTimeline.resume();
  if(gameDiv) gameDiv.classList.remove('paused');
  if(pauseOverlay) pauseOverlay.classList.add('overlay-hidden');
  if(confirmOverlay) confirmOverlay.classList.add('overlay-hidden');
  if(turnInProgress || animationsInProgress > 0){
    resetTurnWatchdog();
  }
  if(turnTimeRemaining > 0){
    startTurnTimer(false);
  }
  if(suddenDeathEnabled){
    startSuddenDeathTimer(false);
  }
  if(pendingAIMovePlayer !== null){
    scheduleAIMove(pendingAIMovePlayer, 400);
    pendingAIMovePlayer = null;
  }
}

function scheduleAIMove(playerIndex, delay = 1000){
  if(isPaused){
    pendingAIMovePlayer = playerIndex;
    return;
  }
  if(aiMoveTimeoutId) clearTimeout(aiMoveTimeoutId);
  aiMoveTimeoutId = setTimeout(() => {
    aiMoveTimeoutId = null;
    performAIMove(playerIndex);
  }, delay);
}

function syncVariablesFromUI(){
  gridWidthNum       = parseInt(widthSelect.value, 10);
  gridHeightNum      = parseInt(heightSelect.value, 10);
  turnTimerSeconds   = parseInt(turnTimerInput.value, 10);
  suddenDeathTimerSeconds = parseInt(suddenDeathTimerInput.value, 10);
  suddenDeathEnabled = suddenDeathToggle.checked;
  setupMode          = setupSelect.value;
  manualSetup        = (setupMode === "manual");
  initialTileValue   = parseInt(initValueSelect.value, 10);
  const rprRaw = parseInt(roundsPerRingInput ? roundsPerRingInput.value : '10', 10);
  roundsPerRing = isNaN(rprRaw) ? 10 : Math.max(1, Math.min(50, rprRaw));
  shrinkCoverageGateEnabled = !!(shrinkCoverageToggle && shrinkCoverageToggle.checked);
  shrinkCoveragePercent = Math.min(100, Math.max(10, parseInt(shrinkCoverageInput ? shrinkCoverageInput.value : '75', 10) || 75));
  showShrinkCounter = !!(showShrinkCounterToggle && showShrinkCounterToggle.checked);
  shrinkAnimMode = (shrinkAnimSelect && shrinkAnimSelect.value) || 'fall';
  shrinkEnabled = !!(shrinkEnabledToggle && shrinkEnabledToggle.checked);
  specialTilesEnabled = !!(specialTilesToggle && specialTilesToggle.checked);
  specialTilesInterval = parseInt(specialTilesIntervalInput ? specialTilesIntervalInput.value : '5', 10) || 5;
  scoreTarget = parseInt(scoreTargetInput ? scoreTargetInput.value : '100', 10) || 100;
  powerupCostMode = (powerupCostModeSelect && powerupCostModeSelect.value) || 'tile';
  if(factoryModeSelect) factoryMode = factoryModeSelect.value;
  if(factoryEmptyToggle) factoryStrictEmpty = !!factoryEmptyToggle.checked;
  powerupPointCost = Math.max(0, parseInt(powerupPointCostInput ? powerupPointCostInput.value : '20', 10) || 0);
  tilesOfWarEnabled = !!(tilesOfWarToggle && tilesOfWarToggle.checked);
  preformEnabled = !!(preformToggle && preformToggle.checked);
  if(setupMode === 'manual'){
    preformEnabled = false;
    if(preformToggle) preformToggle.checked = false;
  }
  if(gridWidthNum < 11 || gridHeightNum < 11){
    preformEnabled = false;
    if(preformToggle) preformToggle.checked = false;
  }
  const parsedPlayers = parseInt(playerSelect.value, 10);
  totalPlayers = Math.max(2, Math.min(maxSelectablePlayers, isNaN(parsedPlayers) ? 2 : parsedPlayers));
  if(playerSelect) playerSelect.value = String(totalPlayers);
  const parsedAI = parseInt(aiPlayerSelect.value, 10);
  totalAIPlayers = Math.max(0, Math.min(totalPlayers, isNaN(parsedAI) ? 0 : parsedAI));
  if(aiPlayerSelect) aiPlayerSelect.value = String(totalAIPlayers);
  powerupEnabled = {
    romboid: !!(powerupRomboidToggle && powerupRomboidToggle.checked),
    viewfinder: !!(powerupViewfinderToggle && powerupViewfinderToggle.checked),
    wall: !!(powerupWallToggle && powerupWallToggle.checked),
    skip: !!(powerupSkipToggle && powerupSkipToggle.checked)
  };
  if(!powerupEnabled.romboid && !powerupEnabled.viewfinder && !powerupEnabled.wall && !powerupEnabled.skip){
    activePowerup = null;
    pendingPowerAction = null;
    clearWallPreview();
  }
  showDefeatPopup = !!(showDefeatPopupToggle && showDefeatPopupToggle.checked);
  newsEnabled = !!(newsToggle && newsToggle.checked);
  powerupCooldownTurns = Math.max(0, Math.min(10, parseInt(powerupCooldownInput ? powerupCooldownInput.value : '2', 10) || 0));
  powerupCooldownMode = (powerupCooldownModeSelect && powerupCooldownModeSelect.value) || 'block';
}

function attachHostSyncListeners(){
  const inputs = [
    widthSelect, heightSelect, turnTimerInput, suddenDeathTimerInput, suddenDeathToggle,
    setupSelect, initValueSelect, rockCellInput, roundsPerRingInput,
    showShrinkCounterToggle, shrinkAnimSelect, shrinkEnabledToggle,
    shrinkCoverageToggle, shrinkCoverageInput, specialTilesToggle,
    specialTilesIntervalInput, specialTilesDurationInput, tilesOfWarToggle,
    newsToggle, preformToggle,
    powerupRomboidToggle, powerupViewfinderToggle, powerupWallToggle, powerupSkipToggle,
    showDefeatPopupToggle,
    powerupCooldownInput, powerupCooldownModeSelect, scoreTargetInput,
    powerupCostModeSelect, powerupPointCostInput
  ];
  inputs.forEach(el => {
    if(!el) return;
    el.addEventListener('change', () => {
      if(netMode === 'multi' && isHost) {
        syncVariablesFromUI();
        broadcastState();
      }
    });
  });
}

/* ----------------------------------------------------------------
   2) START BUTTON HANDLER
---------------------------------------------------------------- */
startBtn.onclick = () => {
  if(netMode === 'multi' && !isHost){
    alert("Only the host can start the multiplayer game. Wait for host snapshot.");
    return;
  }
  if(netMode === 'multi' && (!ws || ws.readyState !== WebSocket.OPEN || !roomId)){
    alert("Connect to a room first (Create or Join).");
    return;
  }
  
  isPaused = false;
  pendingAIMovePlayer = null;
  if(aiMoveTimeoutId){ clearTimeout(aiMoveTimeoutId); aiMoveTimeoutId = null; }
  gsap.globalTimeline.resume();
  if(gameDiv) gameDiv.classList.remove('paused');
  if(pauseOverlay) pauseOverlay.classList.add('overlay-hidden');
  if(confirmOverlay) confirmOverlay.classList.add('overlay-hidden');
  resetDebugLog();
  syncVariablesFromUI();
  updatePowerupOptionsVisibility();
  updateNewsVisibility();

  // Parametri principali
  totalPlayers       = Math.max(2, Math.min(maxSelectablePlayers, parseInt(playerSelect.value, 10) || 2));
  if(playerSelect) playerSelect.value = String(totalPlayers);
  totalAIPlayers     = Math.min(parseInt(aiPlayerSelect.value, 10) || 0, totalPlayers);
  if(aiPlayerSelect) aiPlayerSelect.value = String(totalAIPlayers);
  if(useQuadrantSeedPreset){
    totalPlayers = 4;
    playerSelect.value = '4';
    // Keep user's AI choice but clamp
    totalAIPlayers = Math.min(parseInt(aiPlayerSelect.value, 10) || 0, totalPlayers);
    aiPlayerSelect.value = String(totalAIPlayers);
  }
  
  shrinkGateReached = !shrinkCoverageGateEnabled;
  shrinkCoverageTargetCount = 0;
  
  applyQuadrantSeedThisGame = useQuadrantSeedPreset && gridWidthNum === 10 && gridHeightNum === 10 && totalPlayers === 4;
  useQuadrantSeedPreset = false;
  let applyChaosSeedThisGame = useChaosPreset;
  useChaosPreset = false;
  
  if(netMode === 'multi'){
    totalPlayers = (peers.length || 1) + multiAiCount;
    startingPeers = peers.slice(); 
    totalAIPlayers = multiAiCount;
    playerSelect.value = String(totalPlayers);
    aiPlayerSelect.value = String(totalAIPlayers);
    mySeat = computeMySeat();
  }

  const rockCellsCount = parseInt(rockCellInput.value, 10) || 0;

  if(totalAIPlayers > totalPlayers){
    alert("Number of AI players cannot exceed total players.");
    return;
  }

  // Clear eventuali timer precedenti
  if(turnTimerTimeoutId) clearTimeout(turnTimerTimeoutId);
  if(turnTimerIntervalId) clearInterval(turnTimerIntervalId);
  if(suddenDeathIntervalId) clearInterval(suddenDeathIntervalId);

  // Se esisteva già un'app Pixi, distruggila per ricrearla
  if(app){
    app.destroy(true, {children: true});
    if(app.view && pixiContainer.contains(app.view)){
      pixiContainer.removeChild(app.view);
    }
    app = null;
  } else {
    pixiContainer.innerHTML = '';
  }

  // Mostra la schermata di gioco per misurare lo spazio disponibile
  menuDiv.style.display = "none";
  gameDiv.style.display = "flex";

  // Calcola la dimensione delle caselle per far stare tutta la griglia in vista
  tileSize = computeTileSizeForViewport();

  // Seleziona i colori e imposta i conteggi a 0
  playerColors = possibleColors.slice(0, totalPlayers);
  tilesCount = new Array(totalPlayers).fill(0);

  // Marca quali player sono AI
  isAIPlayer = new Array(totalPlayers).fill(false);
  const aiStartIndex = (netMode === 'multi') ? (totalPlayers - totalAIPlayers) : 0;
  for(let i = 0; i < totalAIPlayers; i++){
    isAIPlayer[aiStartIndex + i] = true;
  }

  // Inizializziamo le posizioni iniziali (protection area) per i giocatori
  initialPlacements = new Array(totalPlayers).fill(null);

  // Calcola dimensioni in pixel
  const w = gridWidthNum * tileSize;
  const h = gridHeightNum * tileSize;

  // Crea app Pixi e aggiungila al DOM
  app = new PIXI.Application({
    width: w,
    height: h,
    backgroundAlpha: 0,
    antialias: true,
    resolution: window.devicePixelRatio,
    autoDensity: true
  });
  pixiContainer.appendChild(app.view);
  pixiContainer.style.width  = `${w}px`;
  pixiContainer.style.height = `${h}px`;
  app.stage.sortableChildren = true;
  formationOverlayLayer = new PIXI.Container(); formationOverlayLayer.zIndex = 7; app.stage.addChild(formationOverlayLayer);
  preformOverlayLayer = new PIXI.Graphics(); preformOverlayLayer.zIndex = 8; app.stage.addChild(preformOverlayLayer);
  wallPreviewLayer = new PIXI.Graphics(); wallPreviewLayer.zIndex = 9; app.stage.addChild(wallPreviewLayer);
  wallsLayer = new PIXI.Graphics(); wallsLayer.zIndex = 10; app.stage.addChild(wallsLayer);
  fxLayer = new PIXI.Container(); fxLayer.zIndex = 11; app.stage.addChild(fxLayer);

  // Nascondi menu e mostra container di gioco
  menuDiv.style.display = "none";
  gameDiv.style.display = "flex";
  updateNewsVisibility();
  if(shrinkCounterDisplayElem){
    shrinkCounterDisplayElem.style.display = showShrinkCounter ? 'inline' : 'none';
  }

  // Inizializza e avvia la partita
  killAllAnimations();
  initializeLeaderboard();
  startNewGame();
  totalTurnsCounter = 0; activeSpecialTiles.clear(); playerBonusPoints = new Array(totalPlayers).fill(0);

  // Posiziona celle roccia prima di consentire piazzamenti
  placeRockCells(rockCellsCount);
  computeShrinkCoverageTarget();
  checkShrinkGate();
  if(applyQuadrantSeedThisGame){
    seedQuadrantTestLayout();
    applyQuadrantSeedThisGame = false;
  }
  if(applyChaosSeedThisGame){
    seedChaosLayout();
    applyChaosSeedThisGame = false;
  }
  updatePowerupUI();
};

/* ----------------------------------------------------------------
   2-bis) FUNZIONE PER AGGIORNARE LA VISIBILITÀ DEI NUMERI
---------------------------------------------------------------- */
function updateAllTilesVisibility(){
  if(!grid || grid.length === 0) return;
  for(let x = 0; x < gridWidthNum; x++){
    for(let y = 0; y < gridHeightNum; y++){
      const tile = grid[x][y];
      if(!tile || !tile.text) continue;

      if(showNumbers && tile.value > 0 && tile.player !== null){
        tile.text.visible = true;
      } else {
        tile.text.visible = false;
      }
    }
  }
}

/* ----------------------------------------------------------------
   3) START NEW GAME
---------------------------------------------------------------- */
function startNewGame(){
  // Reset variabili
  networkTurnToken = 0;
  pendingActions = [];
  startingPeers = [];
  grid = [];
  tilesCount = new Array(totalPlayers).fill(0);
  turnPlayer = 0;
  setupPhase = manualSetup || preformEnabled;
  playersWhoHavePlaced = 0;
  turnInProgress = false;
  animationsInProgress = 0;
  turnEnded = false;
  turnsTaken = 0;
  roundsCompleted = 0;
  shrinkRoundsCompleted = 0;
  ringsApplied = 0;
  shrinkGateReached = !shrinkCoverageGateEnabled;
  shrinkCoverageTargetCount = 0;
  updateTimerDisplay();
  playerPeakTiles = new Array(totalPlayers).fill(0);
  playerPeakPoints = new Array(totalPlayers).fill(0);
  playerBestPushCaptures = new Array(totalPlayers).fill(0);
  playerBestPushRegion = new Array(totalPlayers).fill("the center");
  playerBestPushExplosions = new Array(totalPlayers).fill(0);
  playerEliminated = new Array(totalPlayers).fill(false);
  pendingElimination = new Array(totalPlayers).fill(false);
  powerupCooldowns = new Array(totalPlayers);
  for(let i=0;i<totalPlayers;i++){ powerupCooldowns[i] = (powerupCooldownMode==='perPower') ? {romboid:0,viewfinder:0,wall:0,skip:0} : 0; }
  playerPointsCurrent = new Array(totalPlayers).fill(0);
  skipTurns = new Array(totalPlayers).fill(0);
  formationStates = new Array(totalPlayers).fill(null).map(() => ({turnsStable:0, ready:false, match:null}));
  
  // Factory Mode Initialization
  assignedFactories = new Array(totalPlayers).fill(null);
  powerupCredits = new Array(totalPlayers).fill(0);
  if(factoryMode === 'random' && powerupCostMode === 'factories'){
    // Assign initial factories
    for(let i=0; i<totalPlayers; i++){
      assignedFactories[i] = Math.floor(Math.random() * formationPatterns.length);
    }
  }
  
  activePowerup = null;
  pendingPowerAction = null;
  wallEdges = new Set();
  wallsToRemove = new Set();
  if(wallsLayer){ wallsLayer.clear(); }
  if(wallPreviewLayer){ wallPreviewLayer.clear(); }
  clearWallPreview();
  if(preformEnabled){
    initPreformState();
    preformSeedCenters = normalizePreformCenters(getSetupSpawnCenters());
    computePreformRegionsFromCenters(preformSeedCenters);
    togglePreformMenu(true);
    preformHoverAnchor = null;
  } else {
    togglePreformMenu(false);
    preformSeedCenters = [];
    preformRegions = [];
  }

  // Crea la griglia in base a gridWidthNum e gridHeightNum
  for(let x = 0; x < gridWidthNum; x++){
    grid[x] = [];
    for(let y = 0; y < gridHeightNum; y++){
      const tile = new PIXI.Container();

      // Sfondo casella trasparente (disegniamo solo per roccia)
      tile.graphics = new PIXI.Graphics();
      tile.addChild(tile.graphics);

      // Cerchio colorato
      tile.circle = new PIXI.Graphics();
      tile.circle.beginFill(0xffffff);
      tile.circle.drawCircle(0, 0, tileSize/2);
      tile.circle.endFill();
      tile.circle.x = tileSize/2;
      tile.circle.y = tileSize/2;
      tile.circle.scale.set(0);
      tile.addChild(tile.circle);

      // Testo
      tile.text = new PIXI.Text('', {
        fontFamily: 'Arial',
        fontSize: tileSize / 2,
        fill: 0x000000,
        align: 'center'
      });
      tile.text.anchor.set(0.5);
      tile.text.x = tileSize / 2;
      tile.text.y = tileSize / 2;
      tile.text.visible = false;
      tile.addChild(tile.text);

      // Info logiche
      tile.x = x * tileSize;
      tile.y = y * tileSize;
      tile.value = 0;
      tile.player = null;
      tile.currentScale = 0;
      tile.currentColor = 0xffffff;
      tile.isExploding = false;
      tile.isRock = false;
      tile.isVoid = false;
      tile.shape = 'circle';
      tile.zIndex = 0;

      // Interazione
      tile.eventMode = 'static';
      tile.on("pointerdown", () => {
        if(tile.isRock) return;
        handleTileClick(x, y);
      });
      tile.on("pointerover", ()=> handleTileHover(x,y));
      tile.on("pointerout", ()=> handleTileOut());

      app.stage.addChild(tile);
      grid[x][y] = tile;
      updateTileGraphics(tile);
    }
  }

  // Se "Automatic" / "Geometric", piazza qualche casella iniziale
  if(!manualSetup && !preformEnabled){
    setupPhase = false;
    const spawn = (setupMode === 'geometric')
      ? getGeometricPositions(gridWidthNum, gridHeightNum, totalPlayers)
      : (setupMode === 'geometric2')
        ? ((totalPlayers === 6)
          ? getGeometricPositionsEdgeSix(gridWidthNum, gridHeightNum)
          : getGeometricPositions(gridWidthNum, gridHeightNum, totalPlayers))
        : getEquidistantPositions(gridWidthNum, gridHeightNum, totalPlayers);
    spawn.forEach((pos, iP) => {
      if(!pos) return;
      initTile(pos.xx, pos.yy, iP, initialTileValue);
    });
  } else {
    setupPhase = true;
  }

  updateBackgroundForCurrentPlayer();
  updateLeaderboard();
  renderPreformOverlay(null);
  updateFormationStateForPlayer(turnPlayer); // Update for first player
  renderFormationOverlay();
  postNews("Welcome to Tiles Wars. Secure the center; borders will shrink every 10 rounds.", 0x444444);
  if(netMode === 'multi' && isHost){
    broadcastState();
  }

  // Avvia il timer e/o la mossa AI
  startTurnTimer();
  if(isAIPlayer[turnPlayer]){
    scheduleAIMove(turnPlayer, 1000);
  }

  // Se abilitato, avvia il “sudden death”
  if(suddenDeathEnabled){
    suddenDeathTimeRemaining = suddenDeathTimerSeconds;
    startSuddenDeathTimer();
  }
}

/* ----------------------------------------------------------------
   4) INIT TILE
---------------------------------------------------------------- */
function initTile(x, y, player, val){
  const tile = grid[x][y];
  if(tile.isExploding){
    console.warn(`Tile at (${x}, ${y}) is currently exploding. Cannot initialize.`);
    return;
  }
  if(tile.isRock) return;

  const before = snapshotTileState(tile);
  tile.player = player;
  tile.value = val;
  tile.currentScale = getScaleForValue(val);
  tile.currentColor = playerColors[player];
  updateTileGraphics(tile);
  logTileChange(x, y, before, snapshotTileState(tile), 'init_tile');

  tilesCount[player]++;
  console.log(`Player ${player + 1} placed a tile at (${x}, ${y}). Total tiles: ${tilesCount[player]}`);

  updateLeaderboard();

  // Se già a 4 o più, esplode subito
  if(tile.value >= 4){
    explodeTile(tile, x, y, player);
  }
}

/* ----------------------------------------------------------------
   5) HANDLE CLICK
---------------------------------------------------------------- */
function isMoveValid(x, y){
  const tile = grid[x][y];
  if(!tile || tile.isRock || tile.isVoid || tile.isExploding) return false;
  
  // Durante il setup manuale: solo celle vuote
  if(setupPhase){
    if(preformEnabled){
      const {grid: baseGrid} = getPatternByIndex(preformState.selectedIndex);
      const pattern = getRotatedPattern(baseGrid, preformState.rotation);
      return canPlacePreformAt(turnPlayer, x, y, pattern);
    }
    if(tile.value !== 0) return false;
    for(let i = 0; i < totalPlayers; i++){
      if(i === turnPlayer) continue;
      if(initialPlacements[i] !== null){
        const { x: px, y: py } = initialPlacements[i];
        if(Math.abs(x - px) <= 1 && Math.abs(y - py) <= 1) return false;
      }
    }
    return true;
  }

  // Se c'è un'azione di powerup pendente (secondo step)
  if(pendingPowerAction){
    if(pendingPowerAction.type === 'viewfinder'){
       return (tile.player !== null && tile.player !== turnPlayer);
    }
    if(pendingPowerAction.type === 'skip'){
       return (tile.player !== null && tile.player !== turnPlayer);
    }
    if(pendingPowerAction.type === 'wall'){
       const anchor = pendingPowerAction.anchor;
       if(!anchor) return !tile.isRock;
       const dx = Math.abs(x - anchor.x);
       const dy = Math.abs(y - anchor.y);
       return (dx + dy === 1);
    }
  }

  // Attivazione powerup (primo step)
  if(activePowerup){
    return (tile.player === turnPlayer && tile.value >= 3);
  }

  // Mossa normale
  return (tile.player === turnPlayer);
}

function handleTileClick(x, y){
  if(isPaused) return;
  if(turnInProgress) return;
  if(netMode === 'multi' && awaitingSync && !suppressNetwork) return;
  if(netMode === 'multi' && !suppressNetwork && turnPlayer !== mySeat) return;
  if(clickLock && clickLockToken === networkTurnToken && !suppressNetwork) return;

  // VALIDAZIONE: Se la mossa non è valida, esci subito senza bloccare nulla
  if(!isMoveValid(x, y)) return;

  // Multiplayer routing
  if(netMode === 'multi' && !suppressNetwork){
    clickLock = true; clickLockToken = networkTurnToken;
    
    // Broadcast action for peer simulation
    const action = {
      x, y, 
      power: activePowerup || null, 
      seat: mySeat, 
      seed: Date.now() & 0xffffffff, 
      token: networkTurnToken
    };
    if(typeof sendActionToHost === 'function') sendActionToHost(action);

    // Execute locally
    withSeed(action.seed, ()=>{
      runLocalClick(x, y);
    });
    return;
  }

  clickLock = true; clickLockToken = networkTurnToken;
  runLocalClick(x, y);
}

function runLocalClick(x, y){
  logicalRoundWorkDone = false;
  resetTurnWatchdog();
  currentMoveCapture = { player: turnPlayer, origin: {x, y}, tiles: new Set() };
  logEvent('move_click', {player: turnPlayer, x, y, activePowerup, pendingPowerAction: pendingPowerAction ? pendingPowerAction.type : null});
  if(setupPhase && preformEnabled){
    const {name, grid: baseGrid} = getPatternByIndex(preformState.selectedIndex);
    const pattern = getRotatedPattern(baseGrid, preformState.rotation);
    if(preformState.placed[turnPlayer]) return;
    if(!canPlacePreformAt(turnPlayer, x, y, pattern)) return;
    placePreformAt(turnPlayer, x, y, pattern);
    preformState.placed[turnPlayer] = true;
    playersWhoHavePlaced++;
    endTurn();
    return;
  }
  // Powerup pending second action
  if(pendingPowerAction){
    const target = grid[x][y];
    if(pendingPowerAction.type === 'viewfinder'){
      if(!target || target.player === null || target.player === turnPlayer) return;
      logEvent('powerup_target', {power: 'viewfinder', player: turnPlayer, x, y});
      turnInProgress = true;
      const before = snapshotTileState(target);
      if(target.value >= 3){
        explodeTile(target, x, y, target.player, true);
      } else {
        target.value++;
        target.currentScale = getScaleForValue(target.value);
        updateTileGraphics(target);
        logTileChange(x, y, before, snapshotTileState(target), 'powerup_viewfinder');
        animateCircleGrowth(target);
      }
      setPowerupCooldownFor(turnPlayer, 'viewfinder');
      pendingPowerAction = null;
      return;
    }
    if(pendingPowerAction.type === 'skip'){
      if(!target || target.player === null || target.player === turnPlayer) return;
      const targetPlayer = target.player;
      skipTurns[targetPlayer] = (skipTurns[targetPlayer] || 0) + 1;
      logEvent('powerup_target', {power: 'skip', player: turnPlayer, target: targetPlayer, x, y});
      pendingPowerAction = null;
      endTurn();
      return;
    }
    if(pendingPowerAction.type === 'wall'){
      const anchor = pendingPowerAction.anchor;
      if(!anchor){
        if(!target || target.isRock) return;
        pendingPowerAction.anchor = {x,y};
        logEvent('powerup_anchor', {power: 'wall', player: turnPlayer, x, y});
        showWallPreview(pendingPowerAction.anchor, null);
        return;
      }
      if(anchor.x === x && anchor.y === y){
        pendingPowerAction.anchor = null;
        clearWallPreview();
        return;
      }
      const dx = Math.abs(x - anchor.x);
      const dy = Math.abs(y - anchor.y);
      if(dx + dy !== 1){
        pendingPowerAction.anchor = {x,y};
        logEvent('powerup_anchor', {power: 'wall', player: turnPlayer, x, y});
        showWallPreview(pendingPowerAction.anchor, null);
        return;
      }
      logEvent('powerup_target', {power: 'wall', player: turnPlayer, x, y, anchor});
      addWallBetween(anchor.x, anchor.y, x, y);
      setPowerupCooldownFor(turnPlayer, 'wall');
      pendingPowerAction = null;
      clearWallPreview();
      endTurn();
      return;
    }
  }

  // Powerup activation
  if(activePowerup){
    const tile = grid[x][y];
    if(!tile || tile.player !== turnPlayer || tile.value < 3) return;
    logEvent('powerup_activate', {power: activePowerup, player: turnPlayer, x, y});
    const canPayFormation = powerupCostMode === 'formations' && getFormationState(turnPlayer).ready;
    const canPayFactory = powerupCostMode === 'factories' && powerupCredits[turnPlayer] > 0;
    const canPayPoints = (powerupCostMode === 'points' || powerupCostMode === 'either') && (playerPointsCurrent[turnPlayer]||0) >= powerupPointCost;
    const canPayTile = (powerupCostMode === 'tile' || powerupCostMode === 'either');
    turnInProgress = true;
    beginTurnStats(turnPlayer, x, y);
    if(activePowerup === 'romboid'){
      if(canPayFormation || canPayFactory){
        consumeFormationCost(turnPlayer);
      } else if(canPayPoints){
        playerPointsCurrent[turnPlayer] -= powerupPointCost;
      } else if(!canPayTile){
        turnInProgress=false; activePowerup=null; updatePowerupUI(); return;
      }
      const before = snapshotTileState(tile);
      tile.value = 1;
      tile.shape = 'romboid';
      tile.player = turnPlayer;
      tile.currentScale = getScaleForValue(1);
      tile.currentColor = playerColors[turnPlayer];
      updateTileGraphics(tile);
      logTileChange(x, y, before, snapshotTileState(tile), 'powerup_romboid');
      setPowerupCooldownFor(turnPlayer, 'romboid');
      activePowerup = null;
      animateCircleGrowth(tile);
      return;
    }
    if(activePowerup === 'viewfinder'){
      if(canPayFormation || canPayFactory){
        consumeFormationCost(turnPlayer);
      } else if(canPayPoints){
        playerPointsCurrent[turnPlayer] -= powerupPointCost;
      } else if(canPayTile){
        const before = snapshotTileState(tile);
        tile.value = 0;
        tile.player = null;
        tilesCount[turnPlayer] = Math.max(0, tilesCount[turnPlayer]-1);
        updateTileGraphics(tile);
        logTileChange(x, y, before, snapshotTileState(tile), 'powerup_viewfinder_sacrifice');
      } else { turnInProgress=false; activePowerup=null; updatePowerupUI(); return; }
      pendingPowerAction = {type:'viewfinder', source:{x,y}};
      setPowerupCooldownFor(turnPlayer, 'viewfinder');
      activePowerup = null;
      updatePowerupUI();
      turnInProgress = false;
      return;
    }
    if(activePowerup === 'skip'){
      if(canPayFormation || canPayFactory){
        consumeFormationCost(turnPlayer);
      } else if(canPayPoints){
        playerPointsCurrent[turnPlayer] -= powerupPointCost;
      } else if(canPayTile){
        const before = snapshotTileState(tile);
        tile.value = 0;
        tile.player = null;
        tilesCount[turnPlayer] = Math.max(0, tilesCount[turnPlayer]-1);
        updateTileGraphics(tile);
        logTileChange(x, y, before, snapshotTileState(tile), 'powerup_skip_sacrifice');
      } else { turnInProgress=false; activePowerup=null; updatePowerupUI(); return; }
      pendingPowerAction = {type:'skip', source:{x,y}};
      setPowerupCooldownFor(turnPlayer, 'skip');
      activePowerup = null;
      updatePowerupUI();
      turnInProgress = false;
      return;
    }
    if(activePowerup === 'wall'){
      if(canPayFormation || canPayFactory){
        consumeFormationCost(turnPlayer);
      } else if(canPayPoints){
        playerPointsCurrent[turnPlayer] -= powerupPointCost;
      } else if(canPayTile){
        const before = snapshotTileState(tile);
        tile.value = 0;
        tile.player = null;
        tilesCount[turnPlayer] = Math.max(0, tilesCount[turnPlayer]-1);
        updateTileGraphics(tile);
        logTileChange(x, y, before, snapshotTileState(tile), 'powerup_wall_sacrifice');
      } else { turnInProgress=false; activePowerup=null; updatePowerupUI(); return; }
      pendingPowerAction = {type:'wall', anchor:null};
      activePowerup = null;
      updatePowerupUI();
      turnInProgress = false;
      return;
    }
  }

  const tile = grid[x][y];
  if(tile.isExploding) {
    console.warn(`Tile at (${x}, ${y}) is currently exploding. Click ignored.`);
    return;
  }

  // Fase di setup manuale (primo turno di inizializzazione)
  if(setupPhase){
    if(tile.value !== 0) return;
    // Enforce protection area only for a player's first orb.
    // Controlliamo se la cella cliccata è all'interno della protezione (3x3) di un'altra iniziale già piazzata.
    for(let i = 0; i < totalPlayers; i++){
      if(i === turnPlayer) continue;
      if(initialPlacements[i] !== null){
        const { x: px, y: py } = initialPlacements[i];
        if(Math.abs(x - px) <= 1 && Math.abs(y - py) <= 1){
          alert("This area is protected by another player's starting orb.");
          return;
        }
      }
    }
    turnInProgress = true;
    beginTurnStats(turnPlayer, x, y);
    initTile(x, y, turnPlayer, initialTileValue);
    // Record the initial placement for this player.
    initialPlacements[turnPlayer] = { x, y };
    playersWhoHavePlaced++;
    endTurn();
    return;
  }

  // Durante il gioco normale
  if(tile.player !== turnPlayer) return;
  turnInProgress = true;
  beginTurnStats(turnPlayer, x, y);

  const before = snapshotTileState(tile);
  if(tile.value >= 3){
    explodeTile(tile, x, y, turnPlayer);
  } else {
    tile.value++;
    updateTileGraphics(tile);
    logTileChange(x, y, before, snapshotTileState(tile), 'click_increment');
    console.log(`Player ${turnPlayer + 1} incremented tile (${x}, ${y}) to ${tile.value}.`);
    updateLeaderboard();
    animateCircleGrowth(tile);
  }
}

/* ----------------------------------------------------------------
   6) ANIMATION CONTROL
---------------------------------------------------------------- */
function startAnimation(){
  animationsInProgress++;
  return currentTurnSessionId;
}
function startTileAnimation(tile) {
    if (gsap.getTweensOf(tile).length > 0) {
        gsap.killTweensOf(tile);
    } else {
        animationsInProgress++;
    }
    return currentTurnSessionId;
}
function finishAnimation(id){
  if(id !== undefined && id !== currentTurnSessionId) {
    console.log(`finishAnimation: ignoring orphaned callback (got ${id}, current ${currentTurnSessionId})`);
    return;
  }
  animationsInProgress--;
  if(animationsInProgress < 0) animationsInProgress = 0;

  if(animationsInProgress === 0 && !turnEnded && !suppressAutoEndTurn){
    turnEnded = true;
    if(typeof recomputeCountsLive === 'function'){ recomputeCountsLive(); }
    emitTurnCommentaryIfNeeded();
    if(typeof totalActiveTiles === 'function' && totalActiveTiles() === 0){ transitionToEndgame(); return; }
    finalizePendingEliminations();
    endTurn();
  }
}

function killAllAnimations(){
  console.log("killAllAnimations: resetting animation state.");
  currentTurnSessionId++; // Invalidate all pending callbacks
  if(app && app.stage){
    gsap.killTweensOf(app.stage);
  }
  if(grid && grid.length){
    for(let x=0; x<gridWidthNum; x++){
      for(let y=0; y<gridHeightNum; y++){
        const t = grid[x][y];
        if(t) {
            gsap.killTweensOf(t);
            gsap.killTweensOf(t.circle.scale);
            gsap.killTweensOf(t.circle);
            t.isExploding = false;
            t.alpha = 1;
            if(!t.isVoid) t.visible = true;
            updateTileGraphics(t);
        }
      }
    }
  }
  if(fxLayer) {
    fxLayer.children.forEach(c => gsap.killTweensOf(c));
    fxLayer.removeChildren();
  }
  animationsInProgress = 0;
}

/* ----------------------------------------------------------------
   7) END TURN
---------------------------------------------------------------- */
let isExecutingEndTurn = false;
function endTurn(isRemoteOverride){
  if(isExecutingEndTurn) return;
  
  // Guard: allow if in setup, if turn was in progress, or if specifically overridden (after animations)
  if(!turnInProgress && !setupPhase && isRemoteOverride === undefined) return; 

  isExecutingEndTurn = true;
  try {
    recomputeCountsLive(); // authoritative count refresh
    clearTurnWatchdog();
    
    if(pendingSyncSnapshot){
      const snap = pendingSyncSnapshot;
      pendingSyncSnapshot = null;
      console.log("Applying deferred snapshot for turn alignment.");
      applySnapshot(snap);
      return; 
    }

    const wasMyTurn = (netMode === 'local' || (netMode === 'multi' && turnPlayer === mySeat));
    const isRemote = isRemoteOverride !== undefined ? isRemoteOverride : (netMode === 'multi' && turnPlayer !== mySeat);

    console.log(`Ending turn for player: ${turnPlayer + 1} (wasMyTurn: ${wasMyTurn}, isRemote: ${isRemote})`);
    
    if(wallsToRemove.size){
      wallsToRemove.forEach(k=> wallEdges.delete(k));
      wallsToRemove.clear();
      redrawWalls();
    }

    if(turnTimerTimeoutId){ clearTimeout(turnTimerTimeoutId); turnTimerTimeoutId = null; }
    if(turnTimerIntervalId){ clearInterval(turnTimerIntervalId); turnTimerIntervalId = null; }
    turnEnded = false;
    emitTurnCommentaryIfNeeded();
    finalizePendingEliminations();
    
    if(specialTilesEnabled){
      awardSpecialTilePoints();
      tickSpecialTiles();
      totalTurnsCounter++;
      if(!isRemote && specialTilesInterval > 0 && totalTurnsCounter % specialTilesInterval === 0){
        spawnSpecialTiles();
      }
    }

    updateFormationStateForPlayer(turnPlayer);
    renderFormationOverlay();

    if(setupPhase){
      if(playersWhoHavePlaced >= totalPlayers){
        setupPhase = false;
        togglePreformMenu(false);
        preformHoverAnchor = null;
        renderPreformOverlay(null);
        console.log("Setup phase completed. Transitioning to Turn state.");
      }
    }

    const isWaitingForShrink = handleRoundProgression(isRemote);
    if(isWaitingForShrink){
      console.log("endTurn: returning early, waiting for shrink.");
      return; 
    }

    logEvent('end_turn', {
      turnPlayer,
      turnsTaken,
      roundsCompleted,
      shrinkRoundsCompleted,
      ringsApplied
    });
    if(currentMoveCapture){
      lastMoveReplay = {
        player: currentMoveCapture.player,
        origin: currentMoveCapture.origin,
        tiles: Array.from(currentMoveCapture.tiles).map(key => {
          const [xStr, yStr] = key.split(',');
          return {x: parseInt(xStr, 10), y: parseInt(yStr, 10)};
        })
      };
      currentMoveCapture = null;
    }
    // Passa la mano
    nextPlayer();
    
    decrementCooldown(turnPlayer);
    updateBackgroundForCurrentPlayer();
    updateLeaderboard();
    turnInProgress = false;
    updateFormationStateForPlayer(turnPlayer); // Update for new player
    updatePowerupUI();
  
  // Advance token and clear lock BEFORE broadcasting, 
  // so peers receive the token for the NEW state.
  networkTurnToken++;
    clickLock = false;
    currentTurnSessionId++; 

  if(netMode === 'multi' && wasMyTurn){
    broadcastState();
    awaitingSync = false;
  }

  if(preformEnabled && setupPhase){
    togglePreformMenu(true);
    renderPreformOverlay(preformHoverAnchor);
  } else if(preformEnabled){
    renderPreformOverlay(null);
  }

  startTurnTimer();
  if(isAIPlayer[turnPlayer]){
    scheduleAIMove(turnPlayer, 1000);
  }
    
    // Check if we have actions waiting for this new turn
  processPendingActions();
  } finally {
    isExecutingEndTurn = false;
  }
}

function nextPlayer(){
  if(setupPhase){
    turnPlayer = (turnPlayer + 1) % totalPlayers;
    if(preformEnabled){
      preformHoverAnchor = null;
      renderPreformOverlay(null);
    }
    return;
  }

  let attempts = 0;
  const oldPlayer = turnPlayer;
  while(true){
    turnPlayer = (turnPlayer + 1) % totalPlayers;
    attempts++;
    if(attempts > totalPlayers) break;
    if(skipTurns[turnPlayer] > 0){
      skipTurns[turnPlayer]--;
      logEvent('skip_turn', {player: turnPlayer});
      continue;
    }
    if(tilesCount[turnPlayer] === 0){
      console.log(`nextPlayer: skipping player ${turnPlayer+1} (tilesCount: 0)`);
      if(allButOneRemain()) break;
      continue;
    }
    break;
  }

  console.log(`nextPlayer: turn passed from ${oldPlayer+1} to ${turnPlayer+1}`);

  if(allButOneRemain()){
    transitionToEndgame();
  }
}

/* ----------------------------------------------------------------
   8) EXPLOSIONS & GROWTH
---------------------------------------------------------------- */
function explodeTile(tile, x, y, player, isSuddenDeath = false){
  // allow explosions triggered on behalf of owner (viewfinder etc.)
  if(tile.isExploding){
    console.warn(`Tile at (${x}, ${y}) already exploding.`);
    return;
  }
  const isRomboid = (tile.shape === 'romboid');
  const before = snapshotTileState(tile);
  logEvent('explode_start', {x, y, player, isRomboid, value: tile.value});
  tile.isExploding = true;
  tile.value = 0;
  tile.player = null;
  tile.currentScale = 0;
  tile.currentColor = 0xffffff;
  tile.shape = 'circle';
  updateTileGraphics(tile);
  logTileChange(x, y, before, snapshotTileState(tile), 'explode_origin');

  tilesCount[player]--;
  if(currentTurnStats){ currentTurnStats.explosions++; }
  if(tilesCount[player] <= 0){ scheduleElimination(player); }
  updateLeaderboard();
  animateExplosion(tile, x, y, player, isRomboid);
}

function animateCircleGrowth(tile){
  startTileAnimation(tile);
  const newScale = getScaleForValue(tile.value);
  gsap.to(tile, {
    duration: 0.6,
    ease: "power2.out",
    currentScale: newScale,
    onUpdate: () => updateTileGraphics(tile),
    onComplete: () => finishAnimation()
  });
}

function animateExplosion(tile, x, y, player, isRomboid=false){
  const sessionId = startTileAnimation(tile);
  gsap.to(tile, {
    duration: 0.6,
    ease: "power2.inOut",
    alpha: 0,
    onUpdate: () => updateTileGraphics(tile),
    onComplete: () => {
      finishAnimation(sessionId);
      gsap.to(tile, {
        duration: 0,
        alpha: 1,
        onComplete: () => { tile.isExploding = false; }
      });
    }
  });

  const dirs = isRomboid
    ? [ {dx:-1, dy:-1}, {dx:1, dy:-1}, {dx:-1, dy:1}, {dx:1, dy:1} ]
    : [ {dx:0, dy:-1}, {dx:0, dy:1}, {dx:-1, dy:0}, {dx:1, dy:0} ];
  let fragmentsCompleted = 0;
  const total = dirs.length;

  dirs.forEach(({dx, dy}) => {
    const nx = x + dx, ny = y + dy;
    if(nx < 0 || ny < 0 || nx >= gridWidthNum || ny >= gridHeightNum){
      fragmentsCompleted++;
      if(fragmentsCompleted === total) resetExplodedTile(tile);
      return;
    }
    const neighbor = grid[nx][ny];
    if(neighbor.isRock || neighbor.isVoid){
      fragmentsCompleted++;
      if(fragmentsCompleted === total) resetExplodedTile(tile);
      return;
    }
    if(hasWallBetween(x,y,nx,ny)){
      markWallForRemoval(x,y,nx,ny);
      
      const fragment = new PIXI.Graphics();
      fragment.beginFill(playerColors[player]);
      fragment.drawCircle(0, 0, tileSize/2);
      fragment.endFill();
      fragment.x = tile.x + tileSize/2;
      fragment.y = tile.y + tileSize/2;
      fragment.scale.set(1/3);
      if(fxLayer) fxLayer.addChild(fragment);
      else app.stage.addChild(fragment);

      startAnimation();
      gsap.to(fragment, {
        duration: 0.3,
        ease: "power1.in",
        x: tile.x + tileSize/2 + (nx - x)*tileSize*0.4,
        y: tile.y + tileSize/2 + (ny - y)*tileSize*0.4,
        onComplete: () => {
          finishAnimation(sessionId);
          gsap.to(fragment, {duration: 0.1, alpha:0, scale:0.5, onComplete:()=>{ if(fxLayer) fxLayer.removeChild(fragment); else app.stage.removeChild(fragment); }});
          fragmentsCompleted++;
          if(fragmentsCompleted === total) resetExplodedTile(tile);
        }
      });
      return;
    }

    // STATE UPDATE AT LAUNCH (Deterministic)
    const oldPlayer = neighbor.player;
    const oldScale = neighbor.currentScale;
    const oldColor = neighbor.currentColor;
    const beforeNeighbor = snapshotTileState(neighbor);
    const triggerExplosion = neighbor.value >= 3;

    if(neighbor.value === 0){
      neighbor.player = player;
      neighbor.value = 1;
      neighbor.currentColor = playerColors[player];
      tilesCount[player]++;
    } else {
      if(neighbor.player !== player){
        tilesCount[oldPlayer] = Math.max(0, (tilesCount[oldPlayer]||0) - 1);
        tilesCount[player]++;
        if(currentTurnStats){
          currentTurnStats.captures++;
          currentTurnStats.capturedPlayers.add(oldPlayer);
          currentTurnStats.captureCounts[oldPlayer] = (currentTurnStats.captureCounts[oldPlayer]||0) + 1;
        }
        if(tilesCount[oldPlayer] === 0){ scheduleElimination(oldPlayer); }
        neighbor.player = player;
        neighbor.currentColor = playerColors[player];
      }
      if(!triggerExplosion){
        neighbor.value++;
      } else {
        neighbor.value = 3;
      }
    }
    logTileChange(nx, ny, beforeNeighbor, snapshotTileState(neighbor), 'explode_neighbor');

    const fragment = new PIXI.Graphics();
    fragment.beginFill(playerColors[player]);
    fragment.drawCircle(0, 0, tileSize/2);
    fragment.endFill();
    fragment.x = tile.x + tileSize/2;
    fragment.y = tile.y + tileSize/2;
    fragment.scale.set(1/3);
    if(fxLayer) fxLayer.addChild(fragment);
    else app.stage.addChild(fragment);

    startAnimation();
    gsap.to(fragment, {
      duration: 0.6,
      ease: "power2.inOut",
      x: neighbor.x + tileSize/2,
      y: neighbor.y + tileSize/2,
      onComplete: () => {
        if(fxLayer) fxLayer.removeChild(fragment);
        else app.stage.removeChild(fragment);
        updateTileGraphics(neighbor);
        updateLeaderboard();

        if(triggerExplosion){
          explodeTile(neighbor, nx, ny, player);
        } else {
          animateGrowthAfterColor(neighbor, oldScale, neighbor.currentColor, player);
        }

        fragmentsCompleted++;
        if(fragmentsCompleted === total){
          resetExplodedTile(tile);
        }
        finishAnimation(sessionId);
      }
    });
    gsap.to(fragment.scale, {
      duration: 0.6,
      ease: "power2.inOut",
      x: 0,
      y: 0
    });
  });
}

function animateGrowthAfterColor(tile, oldScale, finalColor, player){
  const sessionId = startTileAnimation(tile);
  const newScale = getScaleForValue(tile.value);
  gsap.fromTo(tile, {currentScale: oldScale}, {
    duration: 0.4,
    ease: "power2.out",
    currentScale: newScale,
    onUpdate: () => {
      tile.currentColor = finalColor;
      updateTileGraphics(tile);
    },
    onComplete: () => {
      finishAnimation(sessionId);
      if(tile.value >= 4){
        const xx = Math.floor(tile.x / tileSize), yy = Math.floor(tile.y / tileSize);
        explodeTile(tile, xx, yy, player);
      }
    }
  });
}

function resetExplodedTile(tile){
  console.log(`Tile at (${Math.floor(tile.x / tileSize)}, ${Math.floor(tile.y / tileSize)}) reset after explosion.`);
}

/* ----------------------------------------------------------------
   9) HELPER FUNCTIONS
---------------------------------------------------------------- */
function getScaleForValue(v){
  if(v === 1) return 1/3;
  if(v === 2) return 2/3;
  if(v === 3) return 1;
  return 0;
}

function getTileCornerRadius(){
  return Math.max(6, Math.round(tileSize * 0.18));
}
function getPlayerStrokeColor(playerIdx){
  if(typeof playerIdx !== 'number') return null;
  return possibleStrokeColors[playerIdx] || null;
}
function getPlayerStrokeWidth(){
  return Math.max(2, Math.round(tileSize * 0.08));
}

/**
 * Disegna/ridisegna una tile in base allo stato (player, valore, rock, ecc.)
 */
function updateTileGraphics(tile){
  if(tile.isVoid){ tile.visible=false; return; }
  // Se è roccia, disegniamo un quadrato nero e basta
  if(tile.isRock){
    const corner = getTileCornerRadius();
    tile.graphics.clear();
    tile.graphics.beginFill(0x000000);
    tile.graphics.drawRoundedRect(1, 1, tileSize-2, tileSize-2, corner);
    tile.graphics.endFill();

    tile.circle.clear();
    tile.text.text = '';
    tile.text.visible = false;
    return;
  }

  // Non è roccia: disegniamo cella chiara + contorno, ed eventuale highlight special
  const corner = getTileCornerRadius();
  tile.graphics.clear();
  tile.graphics.beginFill(0xf7f9fc);
  tile.graphics.drawRoundedRect(1, 1, tileSize-2, tileSize-2, corner);
  tile.graphics.lineStyle(1, 0xE5E7EB, 1);
  tile.graphics.drawRoundedRect(1, 1, tileSize-2, tileSize-2, corner);
  tile.graphics.endFill();
  tile.graphics.lineStyle(0);
  if(tile.specialTurns && tile.specialTurns>0){
    const innerCorner = Math.max(4, corner - 2);
    tile.graphics.lineStyle(3, 0xffc107, 0.9);
    tile.graphics.drawRoundedRect(3, 3, tileSize-6, tileSize-6, innerCorner);
    tile.graphics.lineStyle(0);
  }

  tile.circle.clear();
  if(tile.player !== null && tile.value > 0){
    const stroke = getPlayerStrokeColor(tile.player);
    if(stroke){
      tile.circle.lineStyle(getPlayerStrokeWidth(), stroke, 1);
    } else {
      tile.circle.lineStyle(0);
    }
    tile.circle.beginFill(tile.currentColor);
    if(tile.shape === 'romboid'){
      const s = tileSize/2 * tile.currentScale;
      tile.circle.drawPolygon([0,-s, s,0, 0,s, -s,0]);
      tile.circle.scale.set(1);
      tile.text.style.fill = 0x111111;
    } else {
      tile.circle.drawCircle(0, 0, tileSize/2);
      tile.circle.scale.set(tile.currentScale);
      tile.text.style.fill = 0x000000;
    }
    tile.circle.endFill();
    tile.circle.alpha = 1;

    // Se showNumbers è true, mostriamo il testo
    tile.text.text = tile.value.toString();
    tile.text.visible = (showNumbers === true);
  } else {
    tile.circle.alpha = 0;
    tile.circle.scale.set(0);
    tile.text.text = '';
    tile.text.visible = false;
  }
}

/** Forza lo sfondo del body a un colore più chiaro di quello del giocatore di turno */
function updateBackgroundForCurrentPlayer(){
  const color = playerColors[turnPlayer] ?? 0x777777;
  if(tilesCount[turnPlayer] === 0 && !setupPhase){
    document.body.style.background = "#ddd";
  } else {
    const YELLOW = 0xF9E43E;
    const ORANGE = 0xFBBB1B;
    let bg;
    if(color === YELLOW){
      bg = pastelDarker(color);
    } else if(color === ORANGE){
      bg = 0xD9A663; // requested RGB(217,166,99)
    } else {
      bg = lightenColor(color, 0.6);
    }
    document.body.style.backgroundColor = "#" + bg.toString(16).padStart(6, "0");
  }
  if(timerDisplayElem){
    const timerBg = mixColors(color, 0xffffff, 0.4);
    const timerAccent = darkenColor(color, 0.25);
    const timerInk = darkenColor(color, 0.55);
    timerDisplayElem.style.setProperty('--timer-bg', `#${timerBg.toString(16).padStart(6, '0')}`);
    timerDisplayElem.style.setProperty('--timer-accent', `#${timerAccent.toString(16).padStart(6, '0')}`);
    timerDisplayElem.style.setProperty('--timer-ink', `#${timerInk.toString(16).padStart(6, '0')}`);
  }
}

function lightenColor(hexColor, amount){
  const r = (hexColor >> 16) & 0xFF;
  const g = (hexColor >> 8) & 0xFF;
  const b = (hexColor) & 0xFF;
  const rr = Math.round(r + (255 - r) * amount);
  const gg = Math.round(g + (255 - g) * amount);
  const bb = Math.round(b + (255 - b) * amount);
  return (rr << 16) | (gg << 8) | (bb);
}
function mixColors(c1, c2, t){
  const r1=(c1>>16)&0xff, g1=(c1>>8)&0xff, b1=c1&0xff;
  const r2=(c2>>16)&0xff, g2=(c2>>8)&0xff, b2=c2&0xff;
  const r=Math.round(r1+(r2-r1)*t), g=Math.round(g1+(g2-g1)*t), b=Math.round(b1+(b2-b1)*t);
  return (r<<16)|(g<<8)|b;
}
function darkenColor(hexColor, amount){
  const r=(hexColor>>16)&0xff, g=(hexColor>>8)&0xff, b=hexColor&0xff;
  const rr=Math.round(r*(1-amount)), gg=Math.round(g*(1-amount)), bb=Math.round(b*(1-amount));
  return (rr<<16)|(gg<<8)|bb;
}
function pastelDarker(hexColor){
  const muted = mixColors(hexColor, 0xB0B0B0, 0.45);
  return darkenColor(muted, 0.08);
}

function countActivePlayers(){
  if(setupPhase) return totalPlayers;
  let active = 0;
  for(let i = 0; i < totalPlayers; i++){
    if((tilesCount[i] || 0) > 0 && !playerEliminated[i]) active++;
  }
  return Math.max(1, active);
}

function allButOneRemain(){
  let active = 0;
  for(let i = 0; i < totalPlayers; i++){
    if(tilesCount[i] > 0) active++;
  }
  return (active <= 1);
}

function transitionToEndgame(){
  if(scoreTarget && playerPointsCurrent && playerPointsCurrent.some(p=>p>=scoreTarget)){
    const maxIdx = playerPointsCurrent.indexOf(Math.max(...playerPointsCurrent));
    transitionToEndgameScore(maxIdx);
    return;
  }
  console.log("Endgame reached.");
  if(turnTimerTimeoutId) clearTimeout(turnTimerTimeoutId);
  if(turnTimerIntervalId) clearInterval(turnTimerIntervalId);
  if(suddenDeathIntervalId) clearInterval(suddenDeathIntervalId);

  gameDiv.style.display = "none";
  const active = [];
  for(let i=0;i<totalPlayers;i++){ if(tilesCount[i] > 0) active.push(i); }
  if(active.length === 1){
    const w = active[0];
    const winnerColor = possibleColors[w] || 0x333333;
    const winnerName = `Player ${w + 1}`;
    winnerText.textContent = `${winnerName} Wins!`;
    winnerText.style.color = `#${winnerColor.toString(16).padStart(6, '0')}`;
  } else if(active.length === 0){
    winnerText.textContent = `Game Over — All empires fell`;
    winnerText.style.color = '#333333';
  } else {
    let best = active[0];
    for(const i of active){ if(tilesCount[i] > tilesCount[best]) best = i; }
    const winnerColor = possibleColors[best] || 0x333333;
    winnerText.textContent = `Player ${best + 1} Wins!`;
    winnerText.style.color = `#${winnerColor.toString(16).padStart(6, '0')}`;
  }
  endgameOverlay.style.display = "block";
}
function checkScoreWin(playerIdx){
  return scoreTarget > 0 && (playerPointsCurrent[playerIdx]||0) >= scoreTarget;
}
function transitionToEndgameScore(winnerIdx){
  console.log("Score victory reached.");
  if(turnTimerTimeoutId) clearTimeout(turnTimerTimeoutId);
  if(turnTimerIntervalId) clearInterval(turnTimerIntervalId);
  if(suddenDeathIntervalId) clearInterval(suddenDeathIntervalId);
  gameDiv.style.display = "none";
  const winnerColor = possibleColors[winnerIdx] || 0x333333;
  const winnerName = `Player ${winnerIdx + 1}`;
  winnerText.textContent = `${winnerName} Wins (Score ${playerPointsCurrent[winnerIdx]})!`;
  winnerText.style.color = `#${winnerColor.toString(16).padStart(6, '0')}`;
  endgameOverlay.style.display = "block";
}

/* ----------------------------------------------------------------
   10) SUDDEN DEATH TIMER & TICK
---------------------------------------------------------------- */
function suddenDeathTick(){
  console.log("Sudden Death Tick");
  for(let x = 0; x < gridWidthNum; x++){
    for(let y = 0; y < gridHeightNum; y++){
      const tile = grid[x][y];
      if(tile.isRock) continue;

      if(tile.player !== null && tile.value > 0){
        // Se è già a 3, esplode
        if(tile.value >= 3){
          explodeTile(tile, x, y, tile.player, true);
        } else {
          const before = snapshotTileState(tile);
          tile.value++;
          animateCircleGrowth(tile);
          logTileChange(x, y, before, snapshotTileState(tile), 'sudden_death_increment');
        }
      }
    }
  }
  updateLeaderboard();
}

function startSuddenDeathTimer(reset = true){
  if(suddenDeathIntervalId) clearInterval(suddenDeathIntervalId);
  if(reset){
    suddenDeathTimeRemaining = suddenDeathTimerSeconds;
  }

  suddenDeathIntervalId = setInterval(() => {
    suddenDeathTimeRemaining--;
    if(suddenDeathTimeRemaining <= 0){
      suddenDeathTick();
      suddenDeathTimeRemaining = suddenDeathTimerSeconds;
    }
    updateTimerDisplay();
  }, 1000);
}

/* ----------------------------------------------------------------
   10-bis) ROUNDS AND SHRINKING RINGS
---------------------------------------------------------------- */
function handleRoundProgression(isRemote = false){
  if(skipRoundProgressOnce){
    console.log("handleRoundProgression: skipRoundProgressOnce is true, resetting flags.");
    skipRoundProgressOnce = false;
    return false;
  }
  
  if(!logicalRoundWorkDone){
    turnsTaken++;
    console.log(`--- Status Check: Turn ${turnsTaken} completed ---`);
    
    // Check if a full round has passed (all alive players moved)
    const activePlayers = countActivePlayers();
    if(activePlayers > 0 && turnsTaken % activePlayers === 0){
      roundsCompleted++;
      console.log(`--- Round ${roundsCompleted} finalized ---`);
      
      if(specialTilesEnabled){
        tickSpecialTiles();
        if(!isRemote && specialTilesInterval > 0 && roundsCompleted % specialTilesInterval === 0){
          awardRoundSpecialPoints();
          spawnSpecialTiles();
        }
      }
      updateTimerDisplay();

      // DECISION: Is it time to shrink?
      if(shrinkEnabled){
        const gateWasReached = shrinkGateReached;
        checkShrinkGate();
        if(shrinkGateReached && gateWasReached){
          shrinkRoundsCompleted++;
        }
  if(shrinkGateReached && roundsPerRing > 0 && shrinkRoundsCompleted > 0 && shrinkRoundsCompleted % roundsPerRing === 0){
          console.log(`Shrink decided: Gate rounds ${shrinkRoundsCompleted} matches setting ${roundsPerRing}.`);
          
          if(isRemote){
            console.log("Peer: pausing turn sequence, waiting for Host FX.");
            return true; 
          }
          
          logEvent('shrink_start', {ring: ringsApplied, mode: shrinkAnimMode, roundsCompleted, shrinkRoundsCompleted});
          postNews(`Borders shrink inward. Outer ring turns to rock.`, 0x222222);
          const started = (shrinkAnimMode === 'walls') ? animateShrinkingRingWalls(ringsApplied, false) : (shrinkAnimMode === 'falloff' ? animateShrinkingEdgeFallOff(ringsApplied, false) : animateShrinkingRingCascade(ringsApplied, false));
          if(started) {
            console.log("Shrink animation started. Turn sequence frozen.");
            return true; 
          }
        }
      }
    }
    logicalRoundWorkDone = true;
  }
  
  return false;
}

function awardRoundSpecialPoints(){
  let winner = null;
  activeSpecialTiles.forEach(k=>{
    const [xs,ys]=k.split(','); const x=+xs,y=+ys; const t=grid[x][y];
    if(!t||t.isVoid||t.isRock) return;
    if(typeof t.player==='number'&& t.value>0){
      const gain = 10; // flat per controlled special tile
      playerPointsCurrent[t.player] = (playerPointsCurrent[t.player]||0) + gain;
      if(checkScoreWin(t.player)) winner = t.player;
    }
  });
  if(winner!==null){ transitionToEndgameScore(winner); }
}

function awardSpecialTilePoints(){
  // Used per-turn if needed, but current logic handles round-based scoring.
  // Placeholder or extension for more aggressive scoring.
}

function totalActiveTiles(){
  let total = 0;
  for(let i=0; i<totalPlayers; i++) total += (tilesCount[i]||0);
  return total;
}

function applyShrinkingRing(ringIndex){
  const W = gridWidthNum;
  const H = gridHeightNum;
  // Numero massimo di anelli possibili
  const maxRings = Math.ceil(Math.min(W, H) / 2);
  if(ringIndex >= maxRings) return false;

  let anyChanged = false;
  const left = ringIndex;
  const right = W - 1 - ringIndex;
  const top = ringIndex;
  const bottom = H - 1 - ringIndex;

  if(left > right || top > bottom) return false;

  // Riga superiore e inferiore
  for(let x = left; x <= right; x++){
    anyChanged = convertToRock(x, top) || anyChanged;
    if(bottom !== top) anyChanged = convertToRock(x, bottom) || anyChanged;
  }
  // Colonna sinistra e destra (escludendo angoli già gestiti)
  for(let y = top + 1; y <= bottom - 1; y++){
    anyChanged = convertToRock(left, y) || anyChanged;
    if(right !== left) anyChanged = convertToRock(right, y) || anyChanged;
  }

  return anyChanged;
}

function convertToRock(x, y){
  const tile = grid[x][y];
  if(!tile || tile.isRock) return false;
  const before = snapshotTileState(tile);
  removeWallsTouching(x,y);
  // Aggiorna conteggi se la cella era di un giocatore
  if(tile.player !== null && typeof tile.player === 'number' && tile.value > 0){
    tilesCount[tile.player] = Math.max(0, (tilesCount[tile.player] || 0) - 1);
    if(tilesCount[tile.player] === 0){ scheduleElimination(tile.player); }
  }
  tile.isRock = true;
  tile.player = "rock";
  tile.value = 0;
  tile.currentScale = 0;
  tile.currentColor = 0x000000;
  logEvent('convert_to_rock', {x, y});
  updateTileGraphics(tile);
  logTileChange(x, y, before, snapshotTileState(tile), 'convert_to_rock');
  return true;
}
function removeWallsTouching(x,y){
  if(!wallEdges || wallEdges.size===0) return;
  const toDelete=[];
  wallEdges.forEach(key=>{
    const [a,b]=key.split('|');
    if(a===`${x},${y}` || b===`${x},${y}`){
      toDelete.push(key);
    }
  });
  toDelete.forEach(k=> wallEdges.delete(k));
  redrawWalls();
}

function getRingCells(ringIndex){
  const W = gridWidthNum, H = gridHeightNum;
  const left = ringIndex, right = W - 1 - ringIndex;
  const top = ringIndex, bottom = H - 1 - ringIndex;
  if(left > right || top > bottom) return [];
  const cells = [];
  for(let x = left; x <= right; x++) cells.push({x, y: top});
  for(let y = top + 1; y <= bottom - 1; y++) cells.push({x: right, y});
  if(bottom !== top){ for(let x = right; x >= left; x--) cells.push({x, y: bottom}); }
  if(right !== left){ for(let y = bottom - 1; y >= top + 1; y--) cells.push({x: left, y}); }
  return cells;
}

function animateShrinkingRingCascade(ringIndex, isRemote = false){
  const cells = getRingCells(ringIndex).filter(({x,y}) => {
    const t = grid[x][y];
    return t && !t.isRock;
  });
  if(cells.length === 0) return false;

  if(!isRemote){
    broadcastFX('shrink', {ringIndex, mode:'fall'});
  }

  const rng = mulberry32(ringIndex + 999);
  const sessionId = currentTurnSessionId; 

  ringAnimationInProgress = true;
  suppressAutoEndTurn = true;
  turnInProgress = true;
  startAnimation();

  let i = 0;
  const dropNext = () => {
    if(i >= cells.length){
      if(!boardOverlay || !boardOverlay.classList.contains('active')){
        resizeBoardToFitViewport(true);
      }
      logEvent('shrink_end', {ring: ringIndex, mode: 'fall', roundsCompleted, shrinkRoundsCompleted});
      ringsApplied++;
      updateLeaderboard();
      updateBackgroundForCurrentPlayer();
      ringAnimationInProgress = false;
      finishAnimation(sessionId);
      suppressAutoEndTurn = false;
      if(allButOneRemain()){
        transitionToEndgame();
        return;
      }
      skipRoundProgressOnce = true;
      endTurn(isRemote);
      return;
    }
    const {x, y} = cells[i++];
    const tile = grid[x][y];
    const block = new PIXI.Graphics();
    const corner = getTileCornerRadius();
    block.beginFill(0x000000);
    block.drawRoundedRect(0, 0, tileSize-2, tileSize-2, corner);
    block.endFill();
    const cx = tile.x + (tileSize-2)/2;
    const cy = tile.y + (tileSize-2)/2;
    block.pivot.set((tileSize-2)/2, (tileSize-2)/2);
    const boardW = gridWidthNum * tileSize;
    const boardH = gridHeightNum * tileSize;
    const originType = Math.floor(rng()*3);
    let startX = cx;
    let startY = -tileSize * (4 + rng()*1.5);
    if(originType === 1){
      startX = -tileSize * (3 + rng()*2.5);
      const span = Math.min(boardH, 3*tileSize);
      startY = cy - span/2 + rng()*span - tileSize;
    } else if(originType === 2){
      startX = boardW + tileSize * (3 + rng()*2.5);
      const span = Math.min(boardH, 3*tileSize);
      startY = cy - span/2 + rng()*span - tileSize;
    } else {
      startX = cx + (rng()*boardW*0.25 - boardW*0.125);
    }
    block.x = startX;
    block.y = startY;
    block.alpha = 0.97;
    const startScale = 2.2 + rng()*0.5;
    block.scale.set(startScale);
    const blurFilter = new PIXI.filters.BlurFilter(6);
    block.filters = [blurFilter];
    if(fxLayer) fxLayer.addChild(block);
    else app.stage.addChild(block);

    const blurObj = {v: 6};
    gsap.to(blurObj, { duration: 0.4, v: 0, ease: "power3.out", onUpdate: () => { blurFilter.blur = blurObj.v; } });
    
    startAnimation(); // Track the movement tween
    gsap.to(block, {
      duration: 0.35,
      ease: "power3.in",
      x: cx,
      y: cy,
      onComplete: () => {
        convertToRock(x, y);
        spawnDustAt(tile.x + tileSize/2, tile.y + tileSize/2);
        subtleShake();
        playThudSfx();
        if(fxLayer) fxLayer.removeChild(block);
        else app.stage.removeChild(block);
        finishAnimation(sessionId);
        setTimeout(dropNext, 20);
      }
    });
    gsap.to(block.scale, {
      duration: 0.35,
      ease: "power3.in",
      x:1,
      y:1
    });
  };
  dropNext();
  return true;
}
function animateShrinkingEdgeFallOff(ringIndex, isRemote = false){
  const cells = getRingCells(ringIndex).filter(({x,y}) => {
    const t = grid[x][y];
    return t; // we will hide tiles directly
  });
  if(cells.length === 0) return false;

  if(!isRemote){
    broadcastFX('shrink', {ringIndex, mode:'falloff'});
  }

  const sessionId = currentTurnSessionId;
  ringAnimationInProgress = true;
  suppressAutoEndTurn = true;
  turnInProgress = true;
  startAnimation();
  const H = gridHeightNum*tileSize;
  let completed = 0;
  const total = cells.length;
  cells.forEach(({x,y}, idx) => {
    const tile = grid[x][y];
    if(tile.value > 0 && typeof tile.player === 'number'){
      tilesCount[tile.player] = Math.max(0, (tilesCount[tile.player]||0) - 1);
      scheduleElimination(tile.player);
    }
    tile.pivot.set((tileSize-2)/2, (tileSize-2)/2);
    tile.x += (tileSize-2)/2; tile.y += (tileSize-2)/2;
    const rot = (Math.random()<0.5? -1:1) * (0.1 + Math.random()*0.25);
    const delay = idx * 0.01;
    startTileAnimation(tile);
    gsap.to(tile, { duration: 0.35, delay, ease: "power2.in", y: tile.y + H + tileSize*2, rotation: rot, alpha: 0, onComplete: () => {
      app.stage.removeChild(tile);
      const before = snapshotTileState(tile);
      tile.isVoid = true; tile.eventMode = 'none'; tile.visible = false;
      tile.player = null; tile.value = 0; tile.currentScale = 0; tile.currentColor = 0xffffff; tile.isRock = false;
      logTileChange(x, y, before, snapshotTileState(tile), 'shrink_falloff_void');
      finishAnimation(sessionId);
      completed++;
      if(completed === total){
        if(!boardOverlay || !boardOverlay.classList.contains('active')){
          resizeBoardToFitViewport(true);
        }
        logEvent('shrink_end', {ring: ringIndex, mode: 'falloff', roundsCompleted, shrinkRoundsCompleted});
        ringsApplied++;
        updateLeaderboard(); updateBackgroundForCurrentPlayer(); finalizePendingEliminations();
        ringAnimationInProgress = false;
        finishAnimation(sessionId);
        suppressAutoEndTurn = false;
        if(allButOneRemain()){ transitionToEndgame(); return; }
        skipRoundProgressOnce = true; endTurn(isRemote);
      }
    }});
  });
  return true;
}
function animateShrinkingRingWalls(ringIndex, isRemote = false){
  const cells = getRingCells(ringIndex);
  if(cells.length === 0) return false;

  if(!isRemote){
    broadcastFX('shrink', {ringIndex, mode:'walls'});
  }

  const sessionId = currentTurnSessionId;
  ringAnimationInProgress = true;
  suppressAutoEndTurn = true;
  turnInProgress = true;
  startAnimation();
  const W = gridWidthNum*tileSize;
  const H = gridHeightNum*tileSize;
  const leftX = ringIndex*tileSize;
  const rightX = (gridWidthNum - ringIndex - 1)*tileSize + (tileSize-2);
  const topY = ringIndex*tileSize;
  const bottomY = (gridHeightNum - ringIndex - 1)*tileSize + (tileSize-2);

  const mkBar = () => new PIXI.Graphics();
  const leftBar = mkBar(); leftBar.beginFill(0x000000, 0.92).drawRect(0,0, tileSize*1.2, H+tileSize*4).endFill(); leftBar.x = -tileSize*2; leftBar.y = -tileSize*2;
  const rightBar = mkBar(); rightBar.beginFill(0x000000, 0.92).drawRect(0,0, tileSize*1.2, H+tileSize*4).endFill(); rightBar.x = W + tileSize*1; rightBar.y = -tileSize*2;
  const topBar = mkBar(); topBar.beginFill(0x000000, 0.92).drawRect(0,0, W+tileSize*4, tileSize*1.2).endFill(); topBar.x = -tileSize*2; topBar.y = -tileSize*2;
  const bottomBar = mkBar(); bottomBar.beginFill(0x000000, 0.92).drawRect(0,0, W+tileSize*4, tileSize*1.2).endFill(); bottomBar.x = -tileSize*2; bottomBar.y = H + tileSize*1;
  [leftBar,rightBar,topBar,bottomBar].forEach(b => app.stage.addChild(b));

  const tl = gsap.timeline({onComplete:()=>{
    cells.forEach(({x,y})=>convertToRock(x,y));
    subtleShake(); playThudSfx();
    gsap.timeline({onComplete:()=>{
      [leftBar,rightBar,topBar,bottomBar].forEach(b=> app.stage.removeChild(b));
      if(!boardOverlay || !boardOverlay.classList.contains('active')){
        resizeBoardToFitViewport(true);
      }
      logEvent('shrink_end', {ring: ringIndex, mode: 'walls', roundsCompleted, shrinkRoundsCompleted});
      ringsApplied++;
      updateLeaderboard(); updateBackgroundForCurrentPlayer();
      ringAnimationInProgress = false;
      skipRoundProgressOnce = true;
      if(allButOneRemain()){ transitionToEndgame(); return; }
      finishAnimation(sessionId);
      suppressAutoEndTurn = false;
      endTurn(isRemote);
    }})
    .to(leftBar, {duration:0.2, x: -tileSize*2, ease:"power2.in"}, 0)
    .to(rightBar,{duration:0.2, x: W + tileSize*1, ease:"power2.in"}, 0)
    .to(topBar,  {duration:0.2, y: -tileSize*2, ease:"power2.in"}, 0)
    .to(bottomBar,{duration:0.2, y: H + tileSize*1, ease:"power2.in"}, 0);
  }});
  tl.to(leftBar, {duration:0.25, x: leftX - tileSize*0.1, ease:"power3.out"}, 0)
    .to(rightBar,{duration:0.25, x: rightX + tileSize*0.1, ease:"power3.out"}, 0)
    .to(topBar,  {duration:0.25, y: topY - tileSize*0.1, ease:"power3.out"}, 0)
    .to(bottomBar,{duration:0.25, y: bottomY + tileSize*0.1, ease:"power3.out"}, 0);
  return true;
}

let previewTweens = [];

function clearPreviewTweens(){
  previewTweens.forEach((tween) => tween.kill());
  previewTweens = [];
}

function openPreview(){ previewModal.setAttribute('aria-hidden','false'); buildPreview(shrinkAnimSelect.value); }
function closePreview(){
  previewModal.setAttribute('aria-hidden','true');
  clearPreviewTweens();
  previewStage.innerHTML='';
}
if(previewShrinkAnimBtn){ previewShrinkAnimBtn.onclick = openPreview; }
if(closePreviewBtn){ closePreviewBtn.onclick = closePreview; }
if(previewModal){ previewModal.addEventListener('click', (e)=>{ if(e.target===previewModal) closePreview(); }); }
if(newsMinBtn){ newsMinBtn.onclick = () => { if(newsBox) newsBox.classList.toggle('collapsed'); }; }

function buildPreview(mode){
  clearPreviewTweens();
  previewStage.innerHTML = '';
  const board = document.createElement('div');
  board.className = 'pv-board';
  previewStage.appendChild(board);

  const cols = 8;
  const rows = 6;
  const cellSize = 22;
  const gap = 2;
  const step = cellSize + gap;
  const boardW = cols * step - gap;
  const boardH = rows * step - gap;
  board.style.width = `${boardW}px`;
  board.style.height = `${boardH}px`;

  const cells = [];
  for(let x=0;x<cols;x++){
    cells[x] = [];
    for(let y=0;y<rows;y++){
      const c = document.createElement('div');
      c.className = 'pv-cell';
      c.style.left = `${x * step}px`;
      c.style.top = `${y * step}px`;
      board.appendChild(c);
      cells[x][y] = c;
    }
  }

  const perimeter = [];
  for(let x=0;x<cols;x++){ perimeter.push({x, y:0}); perimeter.push({x, y:rows-1}); }
  for(let y=1;y<rows-1;y++){ perimeter.push({x:0, y}); perimeter.push({x:cols-1, y}); }

  if(mode === 'walls'){
    const thickness = Math.round(step * 1.2);
    const left = document.createElement('div'); left.className = 'pv-bar';
    left.style.left = `${-step * 2}px`; left.style.top = `${-step * 2}px`;
    left.style.width = `${thickness}px`; left.style.height = `${boardH + step * 4}px`;
    const right = left.cloneNode(); right.style.left = `${boardW + step}px`;
    const top = document.createElement('div'); top.className = 'pv-bar';
    top.style.left = `${-step * 2}px`; top.style.top = `${-step * 2}px`;
    top.style.width = `${boardW + step * 4}px`; top.style.height = `${thickness}px`;
    const bottom = top.cloneNode(); bottom.style.top = `${boardH + step}px`;
    [left,right,top,bottom].forEach(el => board.appendChild(el));
    const leftTarget = -step * 0.1;
    const rightTarget = boardW + step * 0.1;
    const topTarget = -step * 0.1;
    const bottomTarget = boardH + step * 0.1;
    previewTweens.push(gsap.to(left, {duration:0.25, x: leftTarget - (-step * 2), ease:'power3.out'}));
    previewTweens.push(gsap.to(right,{duration:0.25, x: rightTarget - (boardW + step), ease:'power3.out'}));
    previewTweens.push(gsap.to(top,  {duration:0.25, y: topTarget - (-step * 2), ease:'power3.out'}));
    previewTweens.push(gsap.to(bottom,{duration:0.25, y: bottomTarget - (boardH + step), ease:'power3.out', onComplete:()=>{
      perimeter.forEach(({x,y}) => { cells[x][y].style.background = '#0f172a'; });
      previewTweens.push(gsap.to([left,right,top,bottom], {duration:0.18, opacity:0, ease:'power2.in'}));
    }}));
    return;
  }

  if(mode === 'falloff'){
    perimeter.forEach(({x,y}, idx) => {
      const cell = cells[x][y];
      const rot = (idx % 2 === 0 ? -1 : 1) * (0.1 + (idx % 5) * 0.04);
      const delay = idx * 0.02;
      cell.style.transformOrigin = '50% 50%';
      previewTweens.push(gsap.to(cell, {
        duration: 0.35,
        delay,
        ease: "power2.in",
        y: boardH + step * 2,
        rotation: rot,
        opacity: 0,
        onComplete: () => { cell.style.display = 'none'; }
      }));
    });
    return;
  }

  perimeter.forEach(({x,y}, idx) => {
    const r = document.createElement('div');
    r.className = 'pv-rock';
    const tx = x * step;
    const ty = y * step;
    const origin = idx % 3;
    let startX = tx;
    let startY = -step * 4;
    if(origin === 1){
      startX = -step * 4;
      startY = ty - step;
    } else if(origin === 2){
      startX = boardW + step * 3;
      startY = ty - step;
    }
    r.style.left = `${startX}px`;
    r.style.top = `${startY}px`;
    r.style.transform = 'scale(2.1)';
    r.style.opacity = '0.95';
    board.appendChild(r);
    const delay = idx * 0.03;
    previewTweens.push(gsap.to(r, {
      duration:0.32,
      delay,
      left: `${tx}px`,
      top: `${ty}px`,
      scale: 1,
      ease:'power3.in',
      onComplete: () => {
        cells[x][y].style.background = '#0f172a';
        previewTweens.push(gsap.to(r, {duration:0.2, opacity:0.2, onComplete:()=>r.remove()}));
      }
    }));
  });
}

/* ----------------------------------------------------------------
   FX: THUD SOUND, DUST PARTICLES, SUBTLE SHAKE
---------------------------------------------------------------- */
let _audioCtx = null;
function ensureAudioContext(){
  if(!_audioCtx){
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if(Ctx){
      try { _audioCtx = new Ctx(); } catch(e) { _audioCtx = null; }
    }
  }
  if(_audioCtx && _audioCtx.state === 'suspended'){
    _audioCtx.resume?.();
  }
  return _audioCtx;
}

function playThudSfx(){
  const ctx = ensureAudioContext();
  if(!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.03, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.11);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.12);
}

function spawnDustAt(px, py){
  const count = 6 + Math.floor(Math.random()*3);
  const sessionId = currentTurnSessionId;
  for(let i=0;i<count;i++){
    const g = new PIXI.Graphics();
    const alpha = 0.18 + Math.random()*0.12;
    const radius = 1.5 + Math.random()*1.8;
    g.beginFill(0x333333, alpha);
    g.drawCircle(0, 0, radius);
    g.endFill();
    g.x = px;
    g.y = py;
    if(fxLayer) fxLayer.addChild(g);
    else app.stage.addChild(g);
    const angle = Math.random()*Math.PI*2;
    const speed = 18 + Math.random()*28;
    const dx = Math.cos(angle)*speed;
    const dy = Math.sin(angle)*speed - 8;
    const dur = 0.35 + Math.random()*0.12;
    startAnimation();
    gsap.to(g, {
      duration: dur,
      x: px + dx,
      y: py + dy,
      alpha: 0,
      onComplete: () => { 
        if(fxLayer) fxLayer.removeChild(g);
        else app.stage.removeChild(g);
        finishAnimation(sessionId); 
      }
    });
  }
}

function subtleShake(){
  if(!app || !app.stage) return;
  const origX = app.stage.x || 0;
  const origY = app.stage.y || 0;
  const sessionId = currentTurnSessionId;
  startAnimation();
  gsap.to(app.stage, {
    duration: 0.06,
    x: origX + (Math.random() < 0.5 ? -2 : 2),
    y: origY + (Math.random() < 0.5 ? -1 : 1),
    yoyo: true,
    repeat: 1,
    ease: "power1.inOut",
    onComplete: () => { finishAnimation(sessionId); }
  });
}

/* ----------------------------------------------------------------
   11) TURN TIMER FUNCTIONS
---------------------------------------------------------------- */
function startTurnTimer(reset = true){
  if(netMode === 'multi' && awaitingSync) return;

  if(turnTimerTimeoutId) clearTimeout(turnTimerTimeoutId);
  if(turnTimerIntervalId) clearInterval(turnTimerIntervalId);

  if(reset){
    turnTimeRemaining = turnTimerSeconds;
  }
  updateTimerDisplay();
  const timerDuration = Math.max(0, turnTimeRemaining);
  turnTimerIntervalId = setInterval(() => {
    turnTimeRemaining--;
    if(turnTimeRemaining < 0) turnTimeRemaining = 0;
    updateTimerDisplay();
  }, 1000);

  turnTimerTimeoutId = setTimeout(() => {
    clearInterval(turnTimerIntervalId);
    turnTimerIntervalId = null;
    
    // MULTIPLAYER AUTHORITY: Only Host or Active Player triggers endTurn
    if(netMode === 'local' || isHost || turnPlayer === mySeat) {
      console.log("Turn timer expired. Ending turn authoritatively.");
      endTurn();
    } else {
      console.log("Turn timer expired. Waiting for Host/Active player sync...");
    }
  }, timerDuration * 1000);
}

/* ----------------------------------------------------------------
   12) NEIGHBOR HELPER
---------------------------------------------------------------- */
function getNeighbors(x, y){
  const dirs = [ {dx:0, dy:-1}, {dx:0, dy:1}, {dx:-1, dy:0}, {dx:1, dy:0} ];
  const neighbors = [];
  dirs.forEach(({dx, dy}) => {
    const nx = x + dx, ny = y + dy;
    if(nx >= 0 && ny >= 0 && nx < gridWidthNum && ny < gridHeightNum){
      neighbors.push({x: nx, y: ny});
    }
  });
  return neighbors;
}

function countPlayableCells(){
  let total = 0;
  for(let x=0;x<gridWidthNum;x++){
    for(let y=0;y<gridHeightNum;y++){
      const t = grid[x][y];
      if(t && !t.isRock) total++;
    }
  }
  return total;
}
function countOccupiedTiles(){
  let total = 0;
  for(let x=0;x<gridWidthNum;x++){
    for(let y=0;y<gridHeightNum;y++){
      const t = grid[x][y];
      if(t && !t.isRock && typeof t.player === 'number' && t.value>0) total++;
    }
  }
  return total;
}
function checkShrinkGate(){
  if(shrinkGateReached || !shrinkCoverageGateEnabled) return;
  if(shrinkCoverageTargetCount <= 0){
    shrinkCoverageTargetCount = Math.ceil(countPlayableCells() * (shrinkCoveragePercent/100));
  }
  const occupied = countOccupiedTiles();
  if(occupied >= shrinkCoverageTargetCount){
    shrinkGateReached = true;
    shrinkRoundsCompleted = 0;
    postNews("Shrinkage is coming — coverage reached threshold.", 0x222222);
  }
}
function computeShrinkCoverageTarget(){
  shrinkCoverageTargetCount = Math.ceil(countPlayableCells() * (shrinkCoveragePercent/100));
}

/* ----------------------------------------------------------------
   13) "EQUIDISTANT" SPAWN POINTS
---------------------------------------------------------------- */
function getEquidistantPositions(W, H, p){
  // Esempio banale, per 2..6 giocatori su una griglia W x H
  // Adatta come preferisci
  const pos = [];
  const inset = (W === 10 && H === 10) ? 2 : 0;
  const left  = 0 + inset;
  const right = W - 1 - inset;
  const top   = 0 + inset;
  const bottom= H - 1 - inset;
  if(p === 1){
    const cx = Math.floor(W/2);
    const cy = Math.floor(H/2);
    pos.push({xx: cx, yy: cy});
  }
  else if(p === 2){
    pos.push({xx: left,    yy: top},
             {xx: right,   yy: bottom});
  }
  else if(p === 3){
    pos.push({xx: left,    yy: top},
             {xx: right,   yy: top},
             {xx: right,   yy: bottom});
  }
  else if(p === 4){
    pos.push({xx: left,    yy: top},
             {xx: right,   yy: top},
             {xx: right,   yy: bottom},
             {xx: left,    yy: bottom});
  }
  else if(p === 5){
    pos.push({xx: left,    yy: top},
             {xx: right,   yy: top},
             {xx: right,   yy: bottom},
             {xx: left,    yy: bottom},
             {xx: Math.floor(W/2), yy: Math.floor(H/2)});
  }
  else if(p === 6){
    pos.push({xx: left,    yy: top},
             {xx: right,   yy: top},
             {xx: right,   yy: bottom},
             {xx: left,    yy: bottom},
             {xx: Math.floor(W/2), yy: top},
             {xx: Math.floor(W/2), yy: bottom});
  }
  return pos;
}

function wallKey(x1,y1,x2,y2){
  const a = `${x1},${y1}`, b = `${x2},${y2}`;
  return (a < b) ? `${a}|${b}` : `${b}|${a}`;
}
function addWallBetween(x1,y1,x2,y2){
  wallEdges.add(wallKey(x1,y1,x2,y2));
  redrawWalls();
}
function hasWallBetween(x1,y1,x2,y2){
  return wallEdges.has(wallKey(x1,y1,x2,y2));
}
function markWallForRemoval(x1,y1,x2,y2){
  wallsToRemove.add(wallKey(x1,y1,x2,y2));
}
function redrawWalls(){
  if(!wallsLayer) return;
  wallsLayer.clear();
  wallsLayer.lineStyle(8, 0x111111, 0.98);
  wallEdges.forEach(key=>{
    const [a,b] = key.split('|');
    const [x1,y1] = a.split(',').map(Number);
    const [x2,y2] = b.split(',').map(Number);
    const ax = x1*tileSize + tileSize/2;
    const ay = y1*tileSize + tileSize/2;
    const bx = x2*tileSize + tileSize/2;
    const by = y2*tileSize + tileSize/2;
    const mx = (ax+bx)/2;
    const my = (ay+by)/2;
    if(x1 === x2){
      wallsLayer.moveTo(mx - tileSize*0.45, my);
      wallsLayer.lineTo(mx + tileSize*0.45, my);
    } else if(y1 === y2){
      wallsLayer.moveTo(mx, my - tileSize*0.45);
      wallsLayer.lineTo(mx, my + tileSize*0.45);
    } else {
      wallsLayer.moveTo(ax, ay);
      wallsLayer.lineTo(bx, by);
    }
  });
}
function clearWallPreview(){
  if(wallPreviewLayer){ wallPreviewLayer.clear(); }
  if(grid && grid.length){
    for(let x=0;x<gridWidthNum;x++){
      for(let y=0;y<gridHeightNum;y++){
        const t=grid[x][y];
        if(t) t.alpha = 1;
      }
    }
  }
  if(preformEnabled && setupPhase){
    renderPreformOverlay(preformHoverAnchor);
  }
}
function handleTileOut(){
  if(pendingPowerAction && pendingPowerAction.type==='wall' && pendingPowerAction.anchor){
    if(wallPreviewLayer){ wallPreviewLayer.clear(); }
    // keep highlight/dim state
    return;
  }
  if(preformEnabled && setupPhase){
    renderPreformOverlay(null);
    return;
  }
  clearWallPreview();
}
function showWallPreview(anchor, hover){
  if(!wallPreviewLayer) return;
  wallPreviewLayer.clear();
  if(!anchor){
    clearWallPreview();
    return;
  }
  // dim all, highlight anchor + adjacents + hover
  for(let x=0;x<gridWidthNum;x++){
    for(let y=0;y<gridHeightNum;y++){
      const t=grid[x][y];
      if(!t) continue;
      t.alpha = 0.3;
    }
  }
  const adj = [
    {x:anchor.x+1,y:anchor.y},
    {x:anchor.x-1,y:anchor.y},
    {x:anchor.x,y:anchor.y+1},
    {x:anchor.x,y:anchor.y-1},
  ];
  const mark = (p)=>{ if(p.x>=0&&p.y>=0&&p.x<gridWidthNum&&p.y<gridHeightNum){ grid[p.x][p.y].alpha=1; } };
  mark(anchor);
  adj.forEach(mark);
  if(hover){
    const dx=Math.abs(anchor.x-hover.x), dy=Math.abs(anchor.y-hover.y);
    if(dx+dy===1){
      const ax = (anchor.x+hover.x)/2*tileSize + tileSize/2;
      const ay = (anchor.y+hover.y)/2*tileSize + tileSize/2;
      const horiz = anchor.y === hover.y;
      wallPreviewLayer.lineStyle(9, 0x555555, 0.85);
      wallPreviewLayer.filters = [new PIXI.filters.BlurFilter(5)];
      if(horiz){
        wallPreviewLayer.moveTo(ax, ay - tileSize*0.5);
        wallPreviewLayer.lineTo(ax, ay + tileSize*0.5);
      } else {
        wallPreviewLayer.moveTo(ax - tileSize*0.5, ay);
        wallPreviewLayer.lineTo(ax + tileSize*0.5, ay);
      }
    }
  } else {
    wallPreviewLayer.filters = null;
  }
}
function handleTileHover(x,y){
  if(pendingPowerAction && pendingPowerAction.type==='wall'){
    const anchor = pendingPowerAction.anchor;
    if(!anchor) return;
    showWallPreview(anchor, {x,y});
    return;
  }
  if(preformEnabled && setupPhase){
    renderPreformOverlay({x,y});
  }
}
function redrawWalls(){
  if(!wallsLayer) return;
  wallsLayer.clear();
  wallsLayer.lineStyle(6, 0x111111, 0.9);
  wallEdges.forEach(key=>{
    const [a,b] = key.split('|');
    const [x1,y1] = a.split(',').map(Number);
    const [x2,y2] = b.split(',').map(Number);
    const ax = x1*tileSize + tileSize/2;
    const ay = y1*tileSize + tileSize/2;
    const bx = x2*tileSize + tileSize/2;
    const by = y2*tileSize + tileSize/2;
    // draw short segment centered between tiles
    const mx = (ax+bx)/2;
    const my = (ay+by)/2;
    if(x1 === x2){ // vertical line between up/down
      wallsLayer.moveTo(mx - tileSize*0.35, my);
      wallsLayer.lineTo(mx + tileSize*0.35, my);
    } else if(y1 === y2){ // horizontal neighbors
      wallsLayer.moveTo(mx, my - tileSize*0.35);
      wallsLayer.lineTo(mx, my + tileSize*0.35);
    } else {
      wallsLayer.moveTo(ax, ay);
      wallsLayer.lineTo(bx, by);
    }
  });
}

/* ----------------------------------------------------------------
   14) ROCK CELL FUNCTIONS (MODIFICATE PER DISTRIBUZIONE SPECULARE)
---------------------------------------------------------------- */
function placeRockCells(numRocks){
  let placed = 0;
  let attempts = 0;
  const maxAttempts = numRocks * 20;
  const maxConsecutive = Math.max(2, Math.floor(Math.min(gridWidthNum, gridHeightNum) / 4));

  // Se la griglia non ha centro (dimensioni pari) e numRocks è dispari, forziamo il numero a pari.
  if ((gridWidthNum % 2 === 0 || gridHeightNum % 2 === 0) && numRocks % 2 === 1) {
    console.warn("Le dimensioni della griglia non permettono una cella centrale; il numero di rock viene forzato a pari per la distribuzione speculare.");
    numRocks--;
  }

  // Se la griglia ha centro (dimensioni dispari) e numRocks è dispari, posizioniamo la rock centrale.
  if (gridWidthNum % 2 === 1 && gridHeightNum % 2 === 1 && numRocks % 2 === 1) {
    const cx = Math.floor(gridWidthNum / 2);
    const cy = Math.floor(gridHeightNum / 2);
    const centerTile = grid[cx][cy];
    if(!centerTile.isRock && centerTile.value === 0){
      centerTile.isRock = true;
      centerTile.player = "rock";
      centerTile.currentColor = 0x000000;
      updateTileGraphics(centerTile);
      placed++;
    }
    numRocks--; // Resta da posizionare un numero pari di rock
  }

  // Crea un array di candidati rappresentativi per coppie simmetriche.
  // Ogni candidato è una cella "prima" in una coppia; la sua speculare sarà (gridWidthNum-1-x, gridHeightNum-1-y).
  const candidatePairs = [];
  for(let x = 0; x < gridWidthNum; x++){
    for(let y = 0; y < gridHeightNum; y++){
      const sx = gridWidthNum - 1 - x;
      const sy = gridHeightNum - 1 - y;
      // Saltiamo se siamo nella metà "secondaria" oppure se la cella è centrale (già gestita)
      if(x > sx || (x === sx && y >= sy)) continue;
      candidatePairs.push({x, y});
    }
  }

  while(placed < numRocks && attempts < maxAttempts && candidatePairs.length > 0){
    // Scegliamo un candidato casuale
    const index = Math.floor(Math.random() * candidatePairs.length);
    const candidate = candidatePairs[index];
    const x = candidate.x;
    const y = candidate.y;
    const sx = gridWidthNum - 1 - x;
    const sy = gridHeightNum - 1 - y;

    const tile1 = grid[x][y];
    const tile2 = grid[sx][sy];

    // Verifichiamo che entrambe le celle siano libere
    if(tile1.isRock || tile1.value > 0 || tile2.isRock || tile2.value > 0){
      candidatePairs.splice(index, 1);
      attempts++;
      continue;
    }

    // Verifichiamo il vincolo per la riga per entrambe le celle
    let countRow1 = 1;
    for(let i = x - 1; i >= 0; i--){
      if(grid[i][y].isRock) countRow1++; else break;
    }
    for(let i = x + 1; i < gridWidthNum; i++){
      if(grid[i][y].isRock) countRow1++; else break;
    }
    let countRow2 = 1;
    for(let i = sx - 1; i >= 0; i--){
      if(grid[i][sy].isRock) countRow2++; else break;
    }
    for(let i = sx + 1; i < gridWidthNum; i++){
      if(grid[i][sy].isRock) countRow2++; else break;
    }
    if(countRow1 > maxConsecutive || countRow2 > maxConsecutive){
      candidatePairs.splice(index, 1);
      attempts++;
      continue;
    }

    // Verifichiamo il vincolo per la colonna per entrambe le celle
    let countCol1 = 1;
    for(let j = y - 1; j >= 0; j--){
      if(grid[x][j].isRock) countCol1++; else break;
    }
    for(let j = y + 1; j < gridHeightNum; j++){
      if(grid[x][j].isRock) countCol1++; else break;
    }
    let countCol2 = 1;
    for(let j = sy - 1; j >= 0; j--){
      if(grid[sx][j].isRock) countCol2++; else break;
    }
    for(let j = sy + 1; j < gridHeightNum; j++){
      if(grid[sx][j].isRock) countCol2++; else break;
    }
    if(countCol1 > maxConsecutive || countCol2 > maxConsecutive){
      candidatePairs.splice(index, 1);
      attempts++;
      continue;
    }

    // Posizioniamo le rock in entrambe le celle
    tile1.isRock = true;
    tile1.player = "rock";
    tile1.currentColor = 0x000000;
    updateTileGraphics(tile1);

    tile2.isRock = true;
    tile2.player = "rock";
    tile2.currentColor = 0x000000;
    updateTileGraphics(tile2);

    placed += 2;
    attempts++;
  }
  console.log(`Placed ${placed} rock cells (requested originally: ${placed % 2 === 1 ? placed+1 : placed}).`);
}

/* ----------------------------------------------------------------
   15) LEADERBOARD FUNCTIONS
---------------------------------------------------------------- */
function initializeLeaderboard(){
  leaderboardDiv.innerHTML = '<h2 style="text-align:center; margin-bottom: 10px;">Leaderboard</h2>';
  leaderboardEntries = [];

  for(let i = 0; i < totalPlayers; i++){
    const entry = document.createElement('div');
    entry.classList.add('leaderboard-entry');
    entry.dataset.playerIndex = i;

    const blob = document.createElement('div');
    blob.classList.add('blob');
    blob.style.backgroundColor = `#${playerColors[i].toString(16).padStart(6, '0')}`;

    const playerInfo = document.createElement('div');
    playerInfo.classList.add('player-info');

    const playerName = document.createElement('div');
    playerName.classList.add('player-name');
    playerName.textContent = `Player ${i + 1}`;

    playerInfo.appendChild(blob);
    playerInfo.appendChild(playerName);

    const playerCount = document.createElement('div');
    playerCount.classList.add('player-count');
    playerCount.textContent = `${0}`;

    entry.appendChild(playerInfo);
    entry.appendChild(playerCount);
    leaderboardDiv.appendChild(entry);
    leaderboardEntries.push(entry);
  }
  sortLeaderboard();
}

function updateLeaderboard(){
  recomputeCountsLive();
  updatePeaks();
  leaderboardEntries.forEach(entry => {
    const playerIndex = parseInt(entry.dataset.playerIndex, 10);
    const playerCountDiv = entry.querySelector('.player-count');
    const count = tilesCount[playerIndex] || 0;
    const points = (playerPointsCurrent[playerIndex]||0) + (playerBonusPoints[playerIndex]||0);
    
    // Display tiles count as primary, points secondary if greater than 0
    playerCountDiv.textContent = points > 0 ? `${count} (${points})` : `${count}`;

    const playerNameDiv = entry.querySelector('.player-name');
    const blobDiv = entry.querySelector('.blob');

    if(!playerEliminated[playerIndex]){
      blobDiv.style.backgroundColor = `#${playerColors[playerIndex].toString(16).padStart(6, '0')}`;
      playerNameDiv.style.color = `#${playerColors[playerIndex].toString(16).padStart(6, '0')}`;
      playerCountDiv.style.color = `#${playerColors[playerIndex].toString(16).padStart(6, '0')}`;
    } else {
      blobDiv.style.backgroundColor = '#cccccc';
      playerNameDiv.style.color = '#888888';
      playerCountDiv.style.color = '#888888';
    }
  });
  sortLeaderboard();
}

function sortLeaderboard(){
  const sortedEntries = leaderboardEntries.slice().sort((a, b) => {
    const aIndex = parseInt(a.dataset.playerIndex, 10);
    const bIndex = parseInt(b.dataset.playerIndex, 10);
    
    const aTiles = tilesCount[aIndex] || 0;
    const bTiles = tilesCount[bIndex] || 0;
    
    // Primary sort: tiles count
    if (bTiles !== aTiles) return bTiles - aTiles;
    
    // Secondary sort: points
    const aScore = (playerPointsCurrent[aIndex]||0) + (playerBonusPoints[aIndex]||0);
    const bScore = (playerPointsCurrent[bIndex]||0) + (playerBonusPoints[bIndex]||0);
    return bScore - aScore;
  });
  sortedEntries.forEach(entry => {
    leaderboardDiv.appendChild(entry);
  });
}

function recomputeCountsLive(){
  if(typeof playerPointsCurrent === 'undefined' || playerPointsCurrent.length !== totalPlayers){
    playerPointsCurrent = new Array(totalPlayers).fill(0);
  }
  for(let i=0;i<totalPlayers;i++){ tilesCount[i]=0; }
  for(let x=0;x<gridWidthNum;x++){
    for(let y=0;y<gridHeightNum;y++){
      const t = grid[x][y];
      if(!t || t.isVoid || t.isRock) continue;
      if(typeof t.player === 'number' && t.value>0){
        tilesCount[t.player]++;
      }
    }
  }
}

function computeTilesAndPointsForPlayer(idx){
  let tiles = 0, points = playerPointsCurrent[idx]||0;
  for(let x = 0; x < gridWidthNum; x++){
    for(let y = 0; y < gridHeightNum; y++){
      const t = grid[x][y];
      if(t.player === idx && t.value > 0){ tiles++; }
    }
  }
  return {tiles, points};
}

function updatePeaks(){
  for(let i = 0; i < totalPlayers; i++){
    const {tiles, points} = computeTilesAndPointsForPlayer(i);
    if(tiles > playerPeakTiles[i]){
      playerPeakTiles[i] = tiles;
      playerPeakPoints[i] = points;
    } else if(tiles === playerPeakTiles[i] && points > playerPeakPoints[i]){
      playerPeakPoints[i] = points;
    }
  }
}

function updateBestPush(stats){
  if(!stats || stats.captures <= 0) return;
  const i = stats.player;
  if(stats.captures > playerBestPushCaptures[i]){
    playerBestPushCaptures[i] = stats.captures;
    playerBestPushRegion[i] = stats.region;
    playerBestPushExplosions[i] = stats.explosions || 0;
  } else if(stats.captures === playerBestPushCaptures[i] && (stats.explosions || 0) > (playerBestPushExplosions[i] || 0)){
    playerBestPushRegion[i] = stats.region;
    playerBestPushExplosions[i] = stats.explosions || 0;
  }
}

function scheduleElimination(playerIdx){
  if(playerIdx == null) return;
  if(playerEliminated[playerIdx]) return;
  pendingElimination[playerIdx] = true;
  if(currentTurnStats && !currentTurnStats.eliminatedPlayers.includes(playerIdx)){
    currentTurnStats.eliminatedPlayers.push(playerIdx);
  }
}

function finalizePendingEliminations(){
  for(let i = 0; i < totalPlayers; i++){
    if(!pendingElimination[i]) continue;
    if(tilesCount[i] > 0){
      pendingElimination[i] = false;
      continue;
    }
    pendingElimination[i] = false;
    postDefeatObituary(i);
  }
}

function postDefeatObituary(playerIdx){
  if(playerIdx == null) return;
  if(playerEliminated[playerIdx]) return;
  if(tilesCount[playerIdx] > 0) return;
  playerEliminated[playerIdx] = true;

  // Show loss message to the player who lost
  if(netMode === 'multi'){
    if(playerIdx === mySeat){
      showLossMessage(playerIdx);
    }
  } else {
    // In local mode, if it's not an AI
    if(!isAIPlayer[playerIdx]){
      showLossMessage(playerIdx);
    }
  }

  const name = getColorName(playerIdx);
  const peakTiles = playerPeakTiles[playerIdx] || 0;
  const peakPoints = playerPeakPoints[playerIdx] || 0;
  const bestZ = playerBestPushCaptures[playerIdx] || 0;
  const bestArea = playerBestPushRegion[playerIdx] || 'the center';
  let msg = `${name} has been defeated. At the height of their empire they controlled ${peakTiles} tile${peakTiles===1?'':'s'}, a total of ${peakPoints} point${peakPoints===1?'':'s'}.`;
  if(bestZ > 0){
    msg += ` Their biggest push was in ${bestArea}, when they conquered ${bestZ} enemy tile${bestZ===1?'':'s'}.`;
  } else {
    msg += ` Their biggest push never quite materialized.`;
  }
  postNews(msg, playerColors[playerIdx] || 0x444444);
}

function buildDefeatBestMove(playerIdx){
  const bestCaptures = playerBestPushCaptures[playerIdx] || 0;
  const bestExplosions = playerBestPushExplosions[playerIdx] || 0;
  const bestArea = playerBestPushRegion[playerIdx] || 'the center';
  if(bestCaptures <= 0 && bestExplosions <= 0){
    return "Mossa migliore: nessuna conquista significativa.";
  }
  let line = `Mossa migliore: ${bestCaptures} tile conquistate in ${bestArea}`;
  if(bestExplosions > 0){
    line += `, ${bestExplosions} esplosion${bestExplosions === 1 ? 'e' : 'i'} in reazione a catena`;
  }
  return `${line}.`;
}

/* ----------------------------------------------------------------
   16) AI PLAYER FUNCTIONS
---------------------------------------------------------------- */
function performAIMove(playerIndex){
  if(isPaused){
    pendingAIMovePlayer = playerIndex;
    return;
  }
  if(turnInProgress || setupPhase) return;
  
  // MULTIPLAYER SYNC: Only the Room Host triggers AI logic and broadcasts it.
  if(netMode === 'multi' && !isHost) {
    console.log(`AI Player ${playerIndex + 1}: Waiting for host decision...`);
    return; 
  }

  console.log(`AI Player ${playerIndex + 1} is making a move.`);

  turnInProgress = true;
  const ownedTiles = [];

  // ... (find tiles) ...
  for(let x = 0; x < gridWidthNum; x++){
    for(let y = 0; y < gridHeightNum; y++){
      const tile = grid[x][y];
      if(!tile.isVoid && tile.player === playerIndex){
        ownedTiles.push({x, y});
      }
    }
  }

  if(ownedTiles.length === 0){
    console.warn(`AI Player ${playerIndex + 1} has no tiles to play.`);
    if(netMode === 'multi' && isHost) {
       // Host should still broadcast something or just endTurn locally and broadcast state
       endTurn();
    } else {
       endTurn();
    }
    return;
  }

  const L_PATTERNS = [
    [{x:1,y:0},{x:0,y:1},{x:1,y:1}],
    [{x:-1,y:0},{x:0,y:1},{x:-1,y:1}],
    [{x:1,y:0},{x:0,y:-1},{x:1,y:-1}],
    [{x:-1,y:0},{x:0,y:-1},{x:-1,y:-1}]
  ];
  const enemy3Set = new Set();
  for(let x=0;x<gridWidthNum;x++){
    for(let y=0;y<gridHeightNum;y++){
      const t = grid[x][y];
      if(!t || t.isVoid || t.isRock) continue;
      if(t.player !== null && t.player !== playerIndex && t.value === 3){
        enemy3Set.add(keyXY(x,y));
      }
    }
  }
  const trapCenters = [];
  for(let x=0;x<gridWidthNum;x++){
    for(let y=0;y<gridHeightNum;y++){
      const center = grid[x][y];
      if(!center || center.isVoid || center.isRock) continue;
      if(center.player !== playerIndex || center.value > 2) continue;
      const neighbors = getNeighbors(x, y);
      const hasEnemy3 = neighbors.some(n=>{
        const t = grid[n.x][n.y];
        return t && t.player !== null && t.player !== playerIndex && t.value === 3;
      });
      if(!hasEnemy3) continue;
      const patterns = [];
      for(const offsets of L_PATTERNS){
        let usable = true;
        let count3 = 0;
        for(const off of offsets){
          const gx = x + off.x;
          const gy = y + off.y;
          if(gx < 0 || gy < 0 || gx >= gridWidthNum || gy >= gridHeightNum){
            usable = false; break;
          }
          const t = grid[gx][gy];
          if(!t || t.isVoid || t.isRock){ usable = false; break; }
          if(t.player === playerIndex && t.value === 3) count3++;
        }
        if(usable){
          patterns.push({offsets, count3});
        }
      }
      if(patterns.length){
        trapCenters.push({x, y, center, patterns});
      }
    }
  }

  const cx = (gridWidthNum - 1) / 2;
  const cy = (gridHeightNum - 1) / 2;
  let chosenTilePos = null;
  let bestScore = -Infinity;

  const getStateAt = (x, y, overrides) => {
    const key = keyXY(x,y);
    if(overrides && overrides.has(key)) return overrides.get(key);
    return grid[x]?.[y] || null;
  };
  const friendly3CountAroundEnemy = (ex, overrides, convertedSet) => {
    let count = 0;
    const neighbors = getNeighbors(ex.x, ex.y);
    for(const n of neighbors){
      const key = keyXY(n.x, n.y);
      if(convertedSet && convertedSet.has(key)) continue;
      const t = getStateAt(n.x, n.y, overrides);
      if(!t || t.isVoid || t.isRock) continue;
      if(t.player === playerIndex && t.value === 3) count++;
    }
    return count;
  };
  const estimateBackfirePenalty = (pos, tile) => {
    let penalty = 0;
    const overrides = new Map();
    if(tile.value < 3){
      const newValue = tile.value + 1;
      if(newValue === 3){
        overrides.set(keyXY(pos.x,pos.y), {player: playerIndex, value: 3, isVoid: false, isRock: false});
        const neighbors = getNeighbors(pos.x, pos.y);
        for(const n of neighbors){
          const key = keyXY(n.x, n.y);
          if(!enemy3Set.has(key)) continue;
          const ex = {x: n.x, y: n.y};
          const friendlyCount = friendly3CountAroundEnemy(ex, overrides);
          penalty += 25 + Math.max(0, (friendlyCount - 1) * 10);
        }
      }
      return penalty;
    }
    const neighbors = getNeighbors(pos.x, pos.y);
    const convertedSet = new Set();
    for(const n of neighbors){
      const t = grid[n.x]?.[n.y];
      if(!t || t.isVoid || t.isRock) continue;
      const newValue = t.value + 1;
      convertedSet.add(keyXY(n.x, n.y));
      overrides.set(keyXY(n.x,n.y), {player: playerIndex, value: newValue, isVoid: false, isRock: false});
    }
    for(const n of neighbors){
      const newState = getStateAt(n.x, n.y, overrides);
      if(!newState || newState.value !== 3) continue;
      const adj = getNeighbors(n.x, n.y);
      for(const a of adj){
        const key = keyXY(a.x, a.y);
        if(!enemy3Set.has(key)) continue;
        if(convertedSet.has(key)) continue;
        const ex = {x: a.x, y: a.y};
        const friendlyCount = friendly3CountAroundEnemy(ex, overrides, convertedSet);
        penalty += 25 + Math.max(0, (friendlyCount - 1) * 10);
      }
    }
    return penalty;
  };

  const scoreTacticalMove = (pos, tile) => {
    let score = 0;
    const newValue = tile.value + 1;
    for(const centerData of trapCenters){
      for(const pattern of centerData.patterns){
        const isCenter = (pos.x === centerData.x && pos.y === centerData.y);
        if(isCenter){
          if(tile.value === 1 && newValue === 2){
            score = Math.max(score, 18 + 6 * pattern.count3);
          }
          continue;
        }
        let isFeeder = false;
        for(const off of pattern.offsets){
          if(pos.x === centerData.x + off.x && pos.y === centerData.y + off.y){
            isFeeder = true;
            break;
          }
        }
        if(!isFeeder) continue;
        if(tile.value === 3 && centerData.center.value === 2 && pattern.count3 === 3){
          score = Math.max(score, 120);
        } else if(newValue === 3){
          const countAfter = pattern.count3 + (tile.value === 3 ? 0 : 1);
          if(countAfter === 3 && centerData.center.value === 2){
            score = Math.max(score, 80);
          } else {
            score = Math.max(score, 20 + 8 * countAfter);
          }
        }
      }
    }
    return score;
  };

  for(const pos of ownedTiles){
    const tile = grid[pos.x][pos.y];
    if(!tile) continue;
    let score = 0;
    if(tile.value === 3){
      const neighbors = getNeighbors(pos.x, pos.y);
      const hasEnemy3Adj = neighbors.some(n=>{
        const t = grid[n.x][n.y];
        return t && t.player !== null && t.player !== playerIndex && t.value === 3;
      });
      if(hasEnemy3Adj) score += 90;
    }
    if(shrinkEnabled){
      const dx = pos.x - cx;
      const dy = pos.y - cy;
      const distCenter = Math.hypot(dx, dy);
      const edgeDist = Math.min(pos.x, pos.y, (gridWidthNum - 1) - pos.x, (gridHeightNum - 1) - pos.y);
      score += (edgeDist * 2) - (distCenter * 1.5);
    }
    score += scoreTacticalMove(pos, tile);
    score -= estimateBackfirePenalty(pos, tile);
    if(score > bestScore){
      bestScore = score;
      chosenTilePos = pos;
    }
  }
  if(!chosenTilePos){
    chosenTilePos = ownedTiles[Math.floor(Math.random() * ownedTiles.length)];
  }
  logEvent('ai_move', {player: playerIndex, x: chosenTilePos.x, y: chosenTilePos.y});

  if(netMode === 'multi' && isHost) {
    const action = {
      x: chosenTilePos.x, 
      y: chosenTilePos.y, 
      power: null, 
      seat: playerIndex, 
      seed: Date.now() & 0xffffffff, 
      token: networkTurnToken
    };
    sendActionToHost(action);
    // Continue local simulation with the same seed
    withSeed(action.seed, () => {
      const tile = grid[chosenTilePos.x][chosenTilePos.y];
      beginTurnStats(playerIndex, chosenTilePos.x, chosenTilePos.y);
      logicalRoundWorkDone = false;
      const before = snapshotTileState(tile);
      if(tile.value >= 3){
        explodeTile(tile, chosenTilePos.x, chosenTilePos.y, playerIndex);
      } else {
        tile.value++;
        updateTileGraphics(tile);
        logTileChange(chosenTilePos.x, chosenTilePos.y, before, snapshotTileState(tile), 'ai_increment');
        if(tile.value === 1 && tile.player === playerIndex){
          tilesCount[playerIndex]++;
        }
        updateLeaderboard();
        animateCircleGrowth(tile);
      }
    });
  } else {
    // Single player or Local mode
    const tile = grid[chosenTilePos.x][chosenTilePos.y];
    beginTurnStats(playerIndex, chosenTilePos.x, chosenTilePos.y);
    const before = snapshotTileState(tile);
    if(tile.value >= 3){
      explodeTile(tile, chosenTilePos.x, chosenTilePos.y, playerIndex);
    } else {
      tile.value++;
      updateTileGraphics(tile);
      logTileChange(chosenTilePos.x, chosenTilePos.y, before, snapshotTileState(tile), 'ai_increment');
      if(tile.value === 1 && tile.player === playerIndex){
        tilesCount[playerIndex]++;
      }
      updateLeaderboard();
      animateCircleGrowth(tile);
    }
  }
}

/* ----------------------------------------------------------------
   17) TIMER DISPLAY UPDATE
---------------------------------------------------------------- */
function updateTimerDisplay(){
  if(turnTimerDisplayElem){
    turnTimerDisplayElem.style.visibility = 'visible';
    turnTimerDisplayElem.textContent = "Turn Timer: " + turnTimeRemaining + "s";
  }
  if(suddenDeathTimerDisplayElem){
    if(suddenDeathEnabled){
      suddenDeathTimerDisplayElem.style.display = 'inline';
      suddenDeathTimerDisplayElem.textContent = "Sudden Death Timer: " + suddenDeathTimeRemaining + "s";
    } else {
      suddenDeathTimerDisplayElem.style.display = 'none';
    }
  }
  const shrinkGateActive = shrinkEnabled && shrinkCoverageGateEnabled;
  const waitingForShrinkGate = shrinkGateActive && !shrinkGateReached;
  if(shrinkCoverageBufferElem){
    if(waitingForShrinkGate){
      let target = shrinkCoverageTargetCount > 0 ? shrinkCoverageTargetCount : 0;
      if(target <= 0 && grid && grid.length){
        target = Math.max(1, Math.ceil(countPlayableCells() * (shrinkCoveragePercent/100)));
      }
      if(target <= 0) target = 1;
      const occupied = (grid && grid.length) ? countOccupiedTiles() : 0;
      const ratio = target > 0 ? Math.min(1, occupied / target) : 0;
      if(shrinkCoverageFillElem) shrinkCoverageFillElem.style.width = `${Math.round(ratio * 100)}%`;
      if(shrinkCoverageLabelElem){
        shrinkCoverageLabelElem.textContent = "Shrink gate buffering...";
      }
      shrinkCoverageBufferElem.style.display = 'flex';
      shrinkCoverageBufferElem.setAttribute('aria-hidden', 'false');
    } else {
      shrinkCoverageBufferElem.style.display = 'none';
      shrinkCoverageBufferElem.setAttribute('aria-hidden', 'true');
    }
  }
  if(shrinkCounterDisplayElem){
    const showAfterGate = shrinkCoverageGateEnabled && shrinkGateReached;
    const shouldShow = shrinkEnabled && (showShrinkCounter || showAfterGate) && !waitingForShrinkGate;
    if(shouldShow){
      const mod = roundsPerRing > 0 ? (shrinkRoundsCompleted % roundsPerRing) : 0;
      const left = roundsPerRing > 0 ? (mod === 0 ? roundsPerRing : (roundsPerRing - mod)) : 0;
      shrinkCounterDisplayElem.style.display = 'inline';
      shrinkCounterDisplayElem.textContent = `Shrink in: ${left} round${left===1?'':'s'}`;
    } else {
      shrinkCounterDisplayElem.style.display = 'none';
    }
  }
}

/* ----------------------------------------------------------------
   18) EVENT LISTENERS & RESTART HANDLER
---------------------------------------------------------------- */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' && menuDiv.style.display !== "none"){
    startBtn.click();
  }
});
window.addEventListener('resize', () => {
  if(boardOverlay && boardOverlay.classList.contains('active')){
    updateBoardOverlayLayout();
  }
});

function restartGame(){
  if(netMode === 'multi' && isHost && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({type:'reset'}));
  }

  if(turnTimerTimeoutId) clearTimeout(turnTimerTimeoutId);
  if(turnTimerIntervalId) clearInterval(turnTimerIntervalId);
  if(suddenDeathIntervalId) clearInterval(suddenDeathIntervalId);
  if(turnWatchdog) clearTimeout(turnWatchdog);
  if(aiMoveTimeoutId) clearTimeout(aiMoveTimeoutId);
  resetDebugLog();
  aiMoveTimeoutId = null;
  pendingAIMovePlayer = null;
  isPaused = false;
  gsap.globalTimeline.resume();
  if(gameDiv) gameDiv.classList.remove('paused');
  if(pauseOverlay) pauseOverlay.classList.add('overlay-hidden');
  if(confirmOverlay) confirmOverlay.classList.add('overlay-hidden');
  startingPeers = [];

  endgameOverlay.style.display = "none";
  pixiContainer.innerHTML = '';
  app = null;
  gameDiv.style.display = "none";
  menuDiv.style.display = "flex";
  updateNewsVisibility();

  // Riapriamo il menu forzando l’aggiornamento del select
  playerSelect.dispatchEvent(new Event('change'));
}

restartButton.onclick = restartGame;
restartGameButton.onclick = restartGame;

/* ----------------------------------------------------------------
   MULTIPLAYER (LOCAL TEST WS)
---------------------------------------------------------------- */
function setNetUI(){
  const isMulti = (netMode === 'multi');
  if(netStatus){
    netStatus.textContent = roomId ? `Room ${roomId} (${isHost?'host':'guest'})` : 'Offline';
    netStatus.disabled = !roomId;
  }
  if(netButtons) netButtons.style.display = isMulti ? 'flex' : 'none';
  if(netStatusRow) netStatusRow.style.display = isMulti ? 'flex' : 'none';
  
  if(syncStateBtn) {
    syncStateBtn.style.display = (isMulti && isHost && !!app) ? 'inline-block' : 'none';
  }

  if(netPlayerCountRow) netPlayerCountRow.style.display = isMulti ? 'flex' : 'none';
  if(netPlayerCount) netPlayerCount.textContent = String(peers.length);
  
  if(netAiRow) netAiRow.style.display = isMulti ? 'flex' : 'none';
  if(multiAiCountDisplay) multiAiCountDisplay.textContent = String(multiAiCount);

  if(playerSelect){
    playerSelect.disabled = isMulti;
    if(isMulti && peers.length > 0) {
      playerSelect.value = String(peers.length + multiAiCount);
      playerSelect.dispatchEvent(new Event('change'));
    }
  }
  if(aiPlayerSelect){
    aiPlayerSelect.disabled = isMulti;
    if(isMulti) aiPlayerSelect.value = String(multiAiCount);
  }
}

if(incAiBtn){
  incAiBtn.onclick = () => {
    if(netMode !== 'multi') return;
    if(!isHost){ alert("Only the host can add AI players."); return; }
    if(peers.length + multiAiCount >= maxSelectablePlayers) return;
    multiAiCount++;
    setNetUI();
    broadcastState();
  };
}
if(decAiBtn){
  decAiBtn.onclick = () => {
    if(netMode !== 'multi') return;
    if(!isHost){ alert("Only the host can remove AI players."); return; }
    if(multiAiCount <= 0) return;
    multiAiCount--;
    setNetUI();
    broadcastState();
  };
}
function disconnectWs(){
  if(ws){ ws.close(); }
  ws = null; roomId=null; isHost=false; myClientId=null; peers=[]; awaitingSync=false;
  setNetUI();
}
function createRoom(){
  restartGame();
  netMode = 'multi';
  if(netModeToggle) netModeToggle.textContent = 'Multiplayer';
  if(ws) disconnectWs();
  ws = new WebSocket(WS_URL);
  ws.onerror = (e) => { alert('Connection failed. Ensure server.js is running.'); console.error(e); disconnectWs(); };
  ws.onopen = ()=> {
    ws.send(JSON.stringify({type:'create', name:`P${Math.floor(Math.random()*900)+100}`}));
  };
  ws.onmessage = handleWsMessage;
  ws.onclose = ()=>{ roomId=null; setNetUI(); };
}
function joinRoom(code){
  if(!code){ alert("Enter a room code"); return; }
  restartGame();
  netMode = 'multi';
  if(netModeToggle) netModeToggle.textContent = 'Multiplayer';
  if(ws) disconnectWs();
  ws = new WebSocket(WS_URL);
  ws.onerror = (e) => { alert('Connection failed. Ensure server.js is running.'); console.error(e); disconnectWs(); };
  ws.onopen = ()=> {
    ws.send(JSON.stringify({type:'join', roomId: code.trim().toUpperCase(), name:`P${Math.floor(Math.random()*900)+100}`}));
  };
  ws.onmessage = handleWsMessage;
  ws.onclose = ()=>{ roomId=null; setNetUI(); };
}
function sendActionToHost(action){
  if(!ws || ws.readyState !== WebSocket.OPEN || !roomId) return;
  ws.send(JSON.stringify({type:'action', action}));
}
function broadcastState(){
  if(netMode!=='multi' || !ws || ws.readyState!==WebSocket.OPEN) return;
  const snapshot = buildSnapshot();
  ws.send(JSON.stringify({type:'state', snapshot}));
}
function buildSnapshot(){
  const cells = [];
  if (grid && grid.length) {
    for(let x=0;x<gridWidthNum;x++){
      if (!grid[x]) continue;
      for(let y=0;y<gridHeightNum;y++){
        const t = grid[x][y];
        if (!t) continue;
        cells.push({x,y, player: t.player, value: t.value, shape: t.shape, isRock: t.isRock, isVoid: t.isVoid, color: t.currentColor, specialTurns: t.specialTurns||0});
      }
    }
  }
  return {
    gridWidthNum, gridHeightNum,
    turnPlayer, tilesCount, playerPointsCurrent, playerBonusPoints,
    roundsCompleted, shrinkRoundsCompleted, turnsTaken, ringsApplied,
    skipTurns,
    formationStates,
    shrinkGateReached, shrinkEnabled,
    wallEdges: Array.from(wallEdges),
    activeSpecialTiles: Array.from(activeSpecialTiles),
    networkTurnToken,
    startingPeers,
    multiAiCount,
    // Configuration sync
    config: {
      turnTimerSeconds, suddenDeathTimerSeconds, suddenDeathEnabled,
      manualSetup, setupMode, initialTileValue, roundsPerRing,
      preformEnabled,
      shrinkCoverageGateEnabled, shrinkCoveragePercent, showShrinkCounter,
      shrinkAnimMode, specialTilesEnabled, specialTilesInterval,
      scoreTarget, powerupCostMode, powerupPointCost, tilesOfWarEnabled,
      powerupEnabled,
      showDefeatPopup,
      newsEnabled,
      powerupCooldownTurns, powerupCooldownMode
    },
    cells
  };
}
function applySnapshot(snap){
  if(!snap) return;

  // Defer snapshot if we are simulating, UNLESS the snapshot is strictly newer (Authoritative Skip)
  if(netMode === 'multi' && turnInProgress){
    if (snap.networkTurnToken > networkTurnToken) {
      console.warn(`Forced sync: snapshot token ${snap.networkTurnToken} is newer than local ${networkTurnToken}. Breaking lock.`);
      killAllAnimations();
      clearTurnWatchdog();
    } else {
      pendingSyncSnapshot = snap;
      console.log("Snapshot deferred (turnInProgress): token " + snap.networkTurnToken);
      return;
    }
  }

  if(netMode === 'multi' && snap.networkTurnToken < networkTurnToken){
    // Old state, ignore
    return;
  }

  pendingSyncSnapshot = null;
  pendingActions = []; // Clear queue on authoritative jump
  logicalRoundWorkDone = false; 
  clickLock = false;
  const prevState = new Map();
  if(grid && grid.length){
    for(let x=0;x<gridWidthNum;x++){
      for(let y=0;y<gridHeightNum;y++){
        const t=grid[x][y];
        if(!t) continue;
        prevState.set(keyXY(x,y), {player:t.player, value:t.value, shape:t.shape, rock:t.isRock});
      }
    }
  }
  gridWidthNum = snap.gridWidthNum || gridWidthNum;
  gridHeightNum = snap.gridHeightNum || gridHeightNum;

  if(snap.config) {
    const c = snap.config;
    // Update local variables
    turnTimerSeconds = c.turnTimerSeconds;
    suddenDeathTimerSeconds = c.suddenDeathTimerSeconds;
    suddenDeathEnabled = c.suddenDeathEnabled;
    setupMode = c.setupMode || (c.manualSetup ? 'manual' : 'auto');
    manualSetup = setupMode === 'manual';
    initialTileValue = c.initialTileValue;
    preformEnabled = !!c.preformEnabled;
    if(manualSetup || gridWidthNum < 11 || gridHeightNum < 11){
      preformEnabled = false;
    }
    roundsPerRing = c.roundsPerRing;
    shrinkCoverageGateEnabled = c.shrinkCoverageGateEnabled;
    shrinkCoveragePercent = c.shrinkCoveragePercent;
    showShrinkCounter = c.showShrinkCounter;
    shrinkAnimMode = c.shrinkAnimMode;
    specialTilesEnabled = c.specialTilesEnabled;
    specialTilesInterval = c.specialTilesInterval;
    scoreTarget = c.scoreTarget;
    powerupCostMode = c.powerupCostMode;
    powerupPointCost = c.powerupPointCost;
    tilesOfWarEnabled = c.tilesOfWarEnabled;
    powerupEnabled = c.powerupEnabled || powerupEnabled;
    showDefeatPopup = (typeof c.showDefeatPopup === 'boolean') ? c.showDefeatPopup : showDefeatPopup;
    newsEnabled = (typeof c.newsEnabled === 'boolean') ? c.newsEnabled : newsEnabled;
    powerupCooldownTurns = c.powerupCooldownTurns;
    powerupCooldownMode = c.powerupCooldownMode;
  if(Array.isArray(snap.skipTurns)){
    skipTurns = snap.skipTurns.slice();
  }

    // Update DOM elements to reflect Host choices
    if(widthSelect) widthSelect.value = String(snap.gridWidthNum);
    if(heightSelect) heightSelect.value = String(snap.gridHeightNum);
    if(turnTimerInput) turnTimerInput.value = String(turnTimerSeconds);
    if(suddenDeathTimerInput) suddenDeathTimerInput.value = String(suddenDeathTimerSeconds);
    if(suddenDeathToggle) suddenDeathToggle.checked = suddenDeathEnabled;
    if(setupSelect) setupSelect.value = setupMode;
    if(preformToggle) preformToggle.checked = preformEnabled;
    updateSetupPreview();
    if(preformEnabled){
      initPreformState();
      preformSeedCenters = normalizePreformCenters(getSetupSpawnCenters());
      computePreformRegionsFromCenters(preformSeedCenters);
      togglePreformMenu(true);
      preformHoverAnchor = null;
    } else {
      togglePreformMenu(false);
      preformSeedCenters = [];
      preformRegions = [];
      preformHoverAnchor = null;
    }
    if(initValueSelect) initValueSelect.value = String(initialTileValue);
    if(roundsPerRingInput) roundsPerRingInput.value = String(roundsPerRing);
    if(shrinkCoverageToggle) shrinkCoverageToggle.checked = shrinkCoverageGateEnabled;
    if(shrinkCoverageInput) shrinkCoverageInput.value = String(shrinkCoveragePercent);
    if(showShrinkCounterToggle) showShrinkCounterToggle.checked = showShrinkCounter;
    if(shrinkAnimSelect) shrinkAnimSelect.value = shrinkAnimMode;
    if(specialTilesToggle) specialTilesToggle.checked = specialTilesEnabled;
    if(specialTilesIntervalInput) specialTilesIntervalInput.value = String(specialTilesInterval);
    if(scoreTargetInput) scoreTargetInput.value = String(scoreTarget);
    if(powerupCostModeSelect) powerupCostModeSelect.value = powerupCostMode;
    if(powerupPointCostInput) powerupPointCostInput.value = String(powerupPointCost);
    if(tilesOfWarToggle) tilesOfWarToggle.checked = tilesOfWarEnabled;
    if(powerupRomboidToggle) powerupRomboidToggle.checked = !!powerupEnabled.romboid;
    if(powerupViewfinderToggle) powerupViewfinderToggle.checked = !!powerupEnabled.viewfinder;
    if(powerupWallToggle) powerupWallToggle.checked = !!powerupEnabled.wall;
    if(powerupSkipToggle) powerupSkipToggle.checked = !!powerupEnabled.skip;
    updatePowerupOptionsVisibility();
    if(showDefeatPopupToggle) showDefeatPopupToggle.checked = showDefeatPopup;
    if(newsToggle) newsToggle.checked = newsEnabled;
    updateNewsVisibility();
    if(powerupCooldownInput) powerupCooldownInput.value = String(powerupCooldownTurns);
    if(powerupCooldownModeSelect) powerupCooldownModeSelect.value = powerupCooldownMode;
  }

  // ONLY enter game mode if there is actual cell data (meaning game started)
  // or if we already have an app running.
  const hasGameStarted = snap.cells && snap.cells.length > 0 && snap.cells.some(c => c.player !== null);

  if(!app){
    if (!hasGameStarted) {
      console.log("applySnapshot: received config sync, staying in lobby.");
      return; 
    }
    // bootstrap viewer
    totalPlayers = snap.tilesCount ? snap.tilesCount.length : totalPlayers || 4;
    playerColors = possibleColors.slice(0,totalPlayers);
    menuDiv.style.display="none";
    gameDiv.style.display="flex";
    tileSize = computeTileSizeForViewport();
    const w = gridWidthNum * tileSize;
    const h = gridHeightNum * tileSize;
    app = new PIXI.Application({
      width: w, height: h, backgroundAlpha: 0, antialias: true, resolution: window.devicePixelRatio, autoDensity: true
    });
    pixiContainer.appendChild(app.view);
    pixiContainer.style.width = `${w}px`;
    pixiContainer.style.height = `${h}px`;
    app.stage.sortableChildren = true;
    formationOverlayLayer = new PIXI.Container(); formationOverlayLayer.zIndex = 7; app.stage.addChild(formationOverlayLayer);
    preformOverlayLayer = new PIXI.Graphics(); preformOverlayLayer.zIndex = 8; app.stage.addChild(preformOverlayLayer);
    wallPreviewLayer = new PIXI.Graphics(); wallPreviewLayer.zIndex = 9; app.stage.addChild(wallPreviewLayer);
    wallsLayer = new PIXI.Graphics(); wallsLayer.zIndex = 10; app.stage.addChild(wallsLayer);
    fxLayer = new PIXI.Container(); fxLayer.zIndex = 11; app.stage.addChild(fxLayer);
    grid = [];
    for(let x=0;x<gridWidthNum;x++){
      grid[x]=[];
      for(let y=0;y<gridHeightNum;y++){
        const tile = new PIXI.Container();
        tile.graphics = new PIXI.Graphics(); tile.addChild(tile.graphics);
        tile.circle = new PIXI.Graphics(); tile.circle.x=tileSize/2; tile.circle.y=tileSize/2; tile.circle.scale.set(0); tile.addChild(tile.circle);
        tile.text = new PIXI.Text('', {fontFamily:'Arial', fontSize: tileSize/2, fill:0x000000, align:'center'}); tile.text.anchor.set(0.5); tile.text.x=tileSize/2; tile.text.y=tileSize/2; tile.text.visible=false; tile.addChild(tile.text);
        tile.x = x*tileSize; tile.y=y*tileSize;
        tile.value=0; tile.player=null; tile.currentScale=0; tile.currentColor=0xffffff; tile.isExploding=false; tile.isRock=false; tile.isVoid=false; tile.shape='circle'; tile.zIndex=0;
        tile.eventMode='static';
        tile.on("pointerdown", ()=>{ if(tile.isRock) return; handleTileClick(x,y); });
        tile.on("pointerover", ()=> handleTileHover(x,y));
        tile.on("pointerout", ()=> handleTileOut());
        app.stage.addChild(tile);
        grid[x][y]=tile;
        updateTileGraphics(tile);
      }
    }
    menuDiv.style.display="none";
    gameDiv.style.display="flex";
    updateNewsVisibility();
    initializeLeaderboard();
  } else {
    if(!leaderboardEntries || leaderboardEntries.length !== totalPlayers){
      initializeLeaderboard();
    }
  }
  turnPlayer = snap.turnPlayer;
  tilesCount = snap.tilesCount ?? tilesCount;
  playerPointsCurrent = snap.playerPointsCurrent ?? playerPointsCurrent;
  playerBonusPoints = snap.playerBonusPoints ?? playerBonusPoints;
  roundsCompleted = snap.roundsCompleted ?? roundsCompleted;
  shrinkRoundsCompleted = snap.shrinkRoundsCompleted ?? shrinkRoundsCompleted;
  turnsTaken = snap.turnsTaken ?? turnsTaken;
  ringsApplied = snap.ringsApplied ?? ringsApplied;
  shrinkGateReached = !!snap.shrinkGateReached;
  shrinkEnabled = !!snap.shrinkEnabled;
  if(Array.isArray(snap.formationStates)){
    formationStates = snap.formationStates.map(s => ({
      turnsStable: s && typeof s.turnsStable === 'number' ? s.turnsStable : 0,
      ready: !!(s && s.ready),
      match: s && s.match ? s.match : null
    }));
  } else if(!formationStates || formationStates.length !== totalPlayers){
    formationStates = new Array(totalPlayers).fill(null).map(() => ({turnsStable:0, ready:false, match:null}));
  }
  wallEdges = new Set(snap.wallEdges || []);
  activeSpecialTiles = new Set(snap.activeSpecialTiles || []);
  if(snap.startingPeers){ startingPeers = snap.startingPeers; mySeat = computeMySeat(); }
  if(typeof snap.multiAiCount === 'number'){ multiAiCount = snap.multiAiCount; setNetUI(); }
  
  const tokenChanged = (typeof snap.networkTurnToken === 'number' && snap.networkTurnToken !== networkTurnToken);
  if(typeof snap.networkTurnToken === 'number'){ networkTurnToken = snap.networkTurnToken; }
  
  if(tokenChanged) {
    recomputeCountsLive();
    logicalRoundWorkDone = false;
  }
  // rebuild grid visuals
  snap.cells.forEach(c=>{
    const t = grid[c.x][c.y];
    t.player = c.player;
    t.value = c.value;
    t.shape = c.shape || 'circle';
    t.isRock = !!c.isRock;
    t.isVoid = !!c.isVoid;
    t.currentColor = c.color || (typeof c.player==='number' ? playerColors[c.player] : 0xffffff);
    t.specialTurns = c.specialTurns||0;
    t.currentScale = getScaleForValue(t.value);
    updateTileGraphics(t);
  });
  redrawWalls();
  awaitingSync = false;
  turnInProgress = false;
  updateBackgroundForCurrentPlayer();
  updateLeaderboard();
  renderPreformOverlay(null);
  updatePowerupUI();
  if(!Array.isArray(formationStates) || formationStates.length !== totalPlayers){
    formationStates = new Array(totalPlayers).fill(null).map(() => ({turnsStable:0, ready:false, match:null}));
    for(let i=0;i<totalPlayers;i++){
      updateFormationStateForPlayer(i);
    }
  }
  renderFormationOverlay();

  // Always update visuals and timers since we don't receive our own messages
  snap.cells.forEach(c=>{
    const prev = prevState.get(keyXY(c.x,c.y));
    const changed = !prev || prev.player !== c.player || prev.value !== c.value || prev.shape !== (c.shape||'circle') || !!prev.rock !== !!c.isRock;
    if(changed){
      const tile = grid[c.x][c.y];
      const orig = tile.circle.scale.x || tile.currentScale || 1;
      gsap.to(tile.circle.scale, {duration:0.15, x: orig*1.2, y: orig*1.2, yoyo:true, repeat:1});
    }
  });

  if(turnPlayer === mySeat){
    clickLock = false;
    postNews("Your turn!", 0x1d4ed8);
  }

  // Restart timer for the new turn
  startTurnTimer();
  processPendingActions();
}

function getGeometricPositions(W, H, p){
  const positions = [];
  if(p <= 0) return positions;
  const cx = (W - 1) / 2;
  const cy = (H - 1) / 2;
  const margin = (Math.min(W, H) >= 8) ? 1 : 0;
  const maxRadius = Math.min(cx, cy, (W - 1) - cx, (H - 1) - cy) - margin;
  const radius = Math.max(0, maxRadius);
  const used = new Set();

  const findNearestFree = (startX, startY) => {
    if(startX >= 0 && startX < W && startY >= 0 && startY < H && !used.has(keyXY(startX, startY))){
      return {x: startX, y: startY};
    }
    for(let r = 1; r <= Math.max(W, H); r++){
      for(let dx = -r; dx <= r; dx++){
        const dy = r - Math.abs(dx);
        const candidates = [
          {x: startX + dx, y: startY + dy},
          {x: startX + dx, y: startY - dy}
        ];
        for(const c of candidates){
          if(c.x < 0 || c.y < 0 || c.x >= W || c.y >= H) continue;
          const key = keyXY(c.x, c.y);
          if(!used.has(key)) return c;
        }
      }
    }
    return {x: Math.max(0, Math.min(W - 1, startX)), y: Math.max(0, Math.min(H - 1, startY))};
  };

  for(let i = 0; i < p; i++){
    const angle = (-Math.PI / 2) + (i * 2 * Math.PI / p);
    let x = Math.round(cx + radius * Math.cos(angle));
    let y = Math.round(cy + radius * Math.sin(angle));
    x = Math.max(0, Math.min(W - 1, x));
    y = Math.max(0, Math.min(H - 1, y));
    const placed = findNearestFree(x, y);
    used.add(keyXY(placed.x, placed.y));
    positions.push({xx: placed.x, yy: placed.y});
  }
  return positions;
}
function getGeometricPositionsEdgeSix(W, H){
  const positions = [];
  const used = new Set();
  const cx = (W - 1) / 2;
  const cy = (H - 1) / 2;
  const xLeft = 1;
  const xRight = Math.max(1, W - 2);
  const yTop = 1;
  const yBottom = Math.max(1, H - 2);
  const upperY = Math.max(1, Math.round((cy + yTop) / 2));
  const lowerY = Math.min(H - 2, Math.round((cy + yBottom) / 2));
  const targets = [
    {x: Math.round(cx), y: yTop},
    {x: xRight, y: upperY},
    {x: xRight, y: lowerY},
    {x: Math.round(cx), y: yBottom},
    {x: xLeft, y: lowerY},
    {x: xLeft, y: upperY}
  ];
  const findNearestFree = (startX, startY) => {
    if(startX >= 0 && startX < W && startY >= 0 && startY < H && !used.has(keyXY(startX, startY))){
      return {x: startX, y: startY};
    }
    for(let r = 1; r <= Math.max(W, H); r++){
      for(let dx = -r; dx <= r; dx++){
        const dy = r - Math.abs(dx);
        const candidates = [
          {x: startX + dx, y: startY + dy},
          {x: startX + dx, y: startY - dy}
        ];
        for(const c of candidates){
          if(c.x < 0 || c.y < 0 || c.x >= W || c.y >= H) continue;
          const key = keyXY(c.x, c.y);
          if(!used.has(key)) return c;
        }
      }
    }
    return {x: Math.max(0, Math.min(W - 1, startX)), y: Math.max(0, Math.min(H - 1, startY))};
  };
  targets.forEach(t => {
    const placed = findNearestFree(t.x, t.y);
    used.add(keyXY(placed.x, placed.y));
    positions.push({xx: placed.x, yy: placed.y});
  });
  return positions;
}

function normalizePattern(grid){
  const out = [];
  for(let y=0;y<grid.length;y++){
    out[y] = [];
    for(let x=0;x<grid[y].length;x++){
      out[y][x] = grid[y][x];
    }
  }
  return out;
}

function rotatePattern(grid){
  const size = grid.length;
  const out = [];
  for(let y=0;y<size;y++){
    out[y] = [];
    for(let x=0;x<size;x++){
      out[y][x] = grid[size - 1 - x][y];
    }
  }
  return out;
}

function sumPattern(grid){
  let sum = 0;
  for(let y=0;y<grid.length;y++){
    for(let x=0;x<grid[y].length;x++){
      sum += grid[y][x];
    }
  }
  return sum;
}

function generateRandomPattern(targetSum = 19, size = 5){
  const grid = Array.from({length: size}, () => Array.from({length: size}, () => 0));
  let sum = 0;
  const center = Math.floor(size / 2);
  grid[center][center] = 1;
  sum = 1;
  const neighbors = (x,y) => [
    {x:x+1,y},{x:x-1,y},{x,y:y+1},{x,y:y-1}
  ].filter(p=>p.x>=0&&p.y>=0&&p.x<size&&p.y<size);
  while(sum < targetSum){
    let cx = Math.floor(Math.random() * size);
    let cy = Math.floor(Math.random() * size);
    if(Math.random() < 0.7){
      const pool = [];
      for(let y=0;y<size;y++){
        for(let x=0;x<size;x++){
          if(grid[y][x] > 0) pool.push({x,y});
        }
      }
      if(pool.length){
        const pick = pool[Math.floor(Math.random()*pool.length)];
        const nbs = neighbors(pick.x, pick.y);
        const next = nbs[Math.floor(Math.random()*nbs.length)];
        cx = next.x; cy = next.y;
      }
    }
    if(grid[cy][cx] < 3){
      grid[cy][cx]++;
      sum++;
    }
  }
  return grid;
}

const preformPatterns = [
  { name: 'Square', grid: [
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,3,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1]
  ]},
  { name: 'Arrow', grid: [
    [0,0,1,0,0],
    [0,1,3,1,0],
    [1,2,3,2,1],
    [0,0,2,0,0],
    [0,0,2,0,0]
  ]},
  { name: 'Phalanx', grid: [
    [0,0,1,0,0],
    [0,1,2,1,0],
    [1,2,3,2,1],
    [0,1,2,1,0],
    [0,0,1,0,0]
  ]},
  { name: 'Testudo', grid: [
    [0,1,1,1,0],
    [1,2,1,2,0],
    [1,0,1,0,1],
    [1,2,0,2,0],
    [0,0,1,0,1]
  ]},
  { name: 'Spearhead', grid: [
    [0,0,2,0,0],
    [0,1,3,1,0],
    [1,2,3,2,1],
    [0,1,1,1,0],
    [0,0,0,0,0]
  ]},
  { name: 'Random A', grid: null },
  { name: 'Random B', grid: null }
];
const formationPatterns = [
  {
    name: 'Ring',
    forward: {x: 0, y: -1},
    grid: [
      [0,0,0,0,0],
      [0,3,3,3,0],
      [2,3,0,3,2],
      [0,3,3,3,0],
      [0,0,0,0,0]
    ]
  },
  {
    name: 'Serpent',
    forward: {x: 1, y: 0},
    grid: [
      [0,3,3,2,0],
      [0,0,0,3,0],
      [0,2,3,3,0],
      [0,3,0,0,0],
      [0,3,3,0,0]
    ]
  },
  {
    name: 'Crest',
    forward: {x: 1, y: 0},
    grid: [
      [0,3,3,3,0],
      [0,3,0,0,0],
      [2,3,0,0,0],
      [0,3,0,0,0],
      [0,3,3,2,0]
    ]
  }
];
function handleIncomingAction(action){
  logicalRoundWorkDone = false;
  // if(!isHost) return;
  if(typeof action.seat === 'number' && action.seat !== turnPlayer) {
    console.warn(`Action seat mismatch: got ${action.seat+1}, expected ${turnPlayer+1}`);
    return;
  }
  if(action.token !== networkTurnToken) {
    console.warn(`Action token mismatch: got ${action.token}, expected ${networkTurnToken}`);
    return;
  }
  withSeed(action.seed || Date.now(), ()=>{
    turnInProgress = true; 
    suppressNetwork = true; isPlayback=true;
    if(action.power){ activePowerup = action.power; }
    runLocalClick(action.x, action.y);
    isPlayback=false; suppressNetwork = false;
  });
}
function broadcastFX(name, data){
  if(netMode!=='multi' || !ws || ws.readyState!==WebSocket.OPEN) return;
  ws.send(JSON.stringify({type:'fx', name, data}));
}
function processPendingActions(){
  if(turnInProgress || ringAnimationInProgress || !pendingActions.length) return;
  
  const action = pendingActions[0];
  if(action.token === networkTurnToken){
    pendingActions.shift();
    console.log(`Processing queued action for token ${action.token}`);
    handleIncomingAction(action);
  } else if(action.token < networkTurnToken){
    console.log(`Discarding old queued action for token ${action.token}`);
    pendingActions.shift();
    processPendingActions();
  }
}

function handleWsMessage(ev){
  let msg; try { msg = JSON.parse(ev.data); } catch(e){ return; }
  if(msg.type === 'created' || msg.type === 'joined'){
    roomId = msg.roomId; isHost = !!msg.host; peers = msg.peers||[]; myClientId = msg.clientId||null; 
    if(!app) mySeat = computeMySeat(); 
    setNetUI();
    if(roomId && (msg.type === 'created')){ copyRoomCode(roomId); }
    return;
  }
  if(msg.type === 'peers'){
    peers = msg.peers || [];
    if(!app) {
        startingPeers = peers.slice();
        mySeat = computeMySeat();
        console.log(`Seat recomputed: ${mySeat}`);
    }
    setNetUI();
    if(isHost) broadcastState();
    return;
  }
  if(msg.type === 'host'){
    isHost = true;
    setNetUI();
    return;
  }
  if(msg.type === 'state'){
    applySnapshot(msg.snapshot);
    awaitingSync = false;
    return;
  }
  if(msg.type === 'action'){
    if(msg.action.token > networkTurnToken || turnInProgress || ringAnimationInProgress){
      console.log(`Queueing future or overlapping action: token ${msg.action.token} (current ${networkTurnToken}, progress ${turnInProgress})`);
      pendingActions.push(msg.action);
    } else {
      handleIncomingAction(msg.action);
    }
    return;
  }
  if(msg.type === 'fx'){
    // Handle remote FX
    if(msg.name === 'shrink'){
      const { ringIndex, mode } = msg.data;
      if(mode === 'walls') animateShrinkingRingWalls(ringIndex, true);
      else if(mode === 'falloff') animateShrinkingEdgeFallOff(ringIndex, true);
      else animateShrinkingRingCascade(ringIndex, true);
    }
    return;
  }
  if(msg.type === 'reset'){
    restartGame();
    return;
  }
}
function seedQuadrantTestLayout(){
  if(gridWidthNum !==10 || gridHeightNum !==10 || totalPlayers < 4) return;
  // Generate a random, non-touching layout for one quadrant, then mirror to the others.
  const desiredValues = [4,4,4,3,3,2,2,1]; // 8 tiles: 3x4, 2x3, 2x2, 1x1
  const makeQuadrantPattern = () => {
    // Place tiles in a 5x5 quadrant region (0..4) with no orthogonal adjacency.
    // Retry until a valid layout is found.
    while(true){
      const placements = [];
      let failed = false;
      for(const v of desiredValues){
        let placed = false;
        for(let attempt=0; attempt<200; attempt++){
    const dx = Math.floor(Math.random()*5);
    const dy = Math.floor(Math.random()*5);
          if(placements.some(p=>p.dx===dx && p.dy===dy)) continue;
          const touching = placements.some(p=> Math.abs(p.dx - dx) + Math.abs(p.dy - dy) <= 1);
          if(touching) continue;
          placements.push({dx, dy, v});
          placed = true;
          break;
        }
        if(!placed){ failed = true; break; }
      }
      if(!failed) return placements;
    }
  };
  const templates = makeQuadrantPattern();
  const rotate = (p, times)=>{
    let {dx,dy} = p;
    for(let i=0;i<times;i++){
      const ndx = 4 - dy;
      const ndy = dx;
      dx = ndx; dy = ndy;
    }
    return {dx, dy, v:p.v};
  };
  const offsets = [
    {ox:0, oy:0, rot:0},   // top-left
    {ox:5, oy:0, rot:1},   // top-right rotated 90 cw
    {ox:0, oy:5, rot:3},   // bottom-left rotated 270 cw
    {ox:5, oy:5, rot:2}    // bottom-right rotated 180
  ];
  // wipe existing non-rock tiles so preset is clean
  for(let x=0;x<gridWidthNum;x++){
    for(let y=0;y<gridHeightNum;y++){
      const t = grid[x][y];
      if(!t || t.isRock) continue;
      t.player = null;
      t.value = 0;
      t.currentScale = 0;
      t.currentColor = 0xffffff;
      t.shape = 'circle';
      updateTileGraphics(t);
    }
  }
  tilesCount = new Array(totalPlayers).fill(0);
  offsets.forEach((off, idx)=>{
    const pid = idx % totalPlayers;
    templates.forEach(t=>{
      const r = rotate(t, off.rot);
      const baseX = off.ox + r.dx;
      const baseY = off.oy + r.dy;
      const tile = grid[baseX][baseY];
      if(!tile) return;
      tile.player = pid;
      tile.value = t.v;
      tile.currentScale = getScaleForValue(t.v);
      tile.currentColor = playerColors[pid];
      tile.shape = 'circle';
      updateTileGraphics(tile);
      tilesCount[pid]++;
    });
  });
  updateLeaderboard();
}

function seedChaosLayout(){
  // Wipe existing non-rock tiles
  for(let x=0; x<gridWidthNum; x++){
    for(let y=0; y<gridHeightNum; y++){
      const t = grid[x][y];
      if(!t || t.isRock) continue;
      t.player = null;
      t.value = 0;
      t.currentScale = 0;
      t.currentColor = 0xffffff;
      t.shape = 'circle';
      updateTileGraphics(t);
    }
  }
  
  const playableCells = [];
  for(let x=0; x<gridWidthNum; x++){
    for(let y=0; y<gridHeightNum; y++){
      if(!grid[x][y].isRock) playableCells.push({x, y});
    }
  }
  
  // Shuffle playable cells
  for (let i = playableCells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playableCells[i], playableCells[j]] = [playableCells[j], playableCells[i]];
  }
  
  const countToFill = Math.floor(playableCells.length * 0.5);
  tilesCount = new Array(totalPlayers).fill(0);
  
  for(let i=0; i<countToFill; i++){
    const {x, y} = playableCells[i];
    const pid = Math.floor(Math.random() * totalPlayers);
    const val = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
    
    const tile = grid[x][y];
    tile.player = pid;
    tile.value = val;
    tile.currentScale = getScaleForValue(val);
    tile.currentColor = playerColors[pid];
    updateTileGraphics(tile);
    tilesCount[pid]++;
  }
  
  updateLeaderboard();
}
