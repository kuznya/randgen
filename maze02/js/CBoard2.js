const rand = (limit) => (Math.random()*limit)|0

const choice = (abc) => {
    const idx = rand(abc.length);
    return abc[idx];
}

const countBits = (n) => {
  let cnt = 0;
  for (; n; n >>=1) cnt += n&1
  return cnt
}

function CBoard(cfg) {
  this.init(cfg)
}

CBoard.prototype.init = function (cfg) {
  // cfg = {resX, resY, randBit}
  cfg.roomsY = (cfg.resX-1) / 4
  cfg.roomsX = (cfg.resY-1) / 4
  this.cfg = cfg
  this.board = matrix_filled(cfg.resY, cfg.resX, () => 0)
  if (cfg?.isShown) {
    this.map = matrix_filled(cfg.roomsY, cfg.roomsX, cfg.isShown);
  }
}

CBoard.prototype.shown = function(y, x) {
  const
    cfg = this.cfg,
    map = this.map,
    n = !y || !x ||
      x === cfg.resX - 1 ||
      y === cfg.resY - 1 ||
      !((x % 4) || (y % 4))

  if (n) return true
  const
    i = Math.floor((x-1) / 4),
    right = !(x % 4),
    j = Math.floor((y-1) / 4),
    bottom = !(y % 4)
  return map[j][i] || (right && map[j][i+1]) || (bottom && map[j+1][i])
}

CBoard.prototype.markToShow = function(y, x) {
  const
    i = Math.floor((x-1) / 4),
    j = Math.floor((y-1) / 4)
  this.map[j][i] = true;
}

CBoard.prototype.buildMaze = function() {
  const
    cfg = this.cfg,
    a = this.board
  for (let j = 0; j < cfg.resY; j++)
    for (let i = 0; i < cfg.resX; i++) {
      const n = !i || !j ||
        i === cfg.resX-1 ||
        j === cfg.resY-1 ||
        !( (i % 4) || (j % 4) )

      a [j][i] = +!n
    }
}

CBoard.prototype.buildDoors = function() {
  const
    cfg = this.cfg,
    NX = (cfg.resX-1) / 4,
    NY = (cfg.resY-1) / 4,
    rand_door = cfg.randDoor,
    aa = this.board,
    a = cube_filled(NY, NX, 4, () => 0)

  // * generate doors
  //console.log('buildDoors: gen')
  for (let j = 0; j < NY; j++)
    for (let i = 0; i < NX; i++) {
      a[j][i][0] = !i ? 0 : a[j][i-1][2]
      a[j][i][1] = !j ? 0 : a[j-1][i][3]
      a[j][i][2] = i === NX - 1 ? 0 : rand_door()
      a[j][i][3] = j === NY - 1 ? 0 : rand_door()
    }
  this.mapInfo = a;
  //console.log('buildDoors: mapInfo', a)
  // * place doors
  for (let j = 0; j < NY; j++)
    for (let i = 0; i < NX; i++) {
      // right
      let acc = a[j][i][2]
      for (let bit = 0; bit < 3; bit++, acc >>= 1) {
        aa[j*4+1+bit][(i+1)*4] = acc & 1;
      }
      // bottom
      acc = a[j][i][3]
      for (let bit = 0; bit < 3; bit++, acc >>= 1) {
        aa[(j+1)*4][i*4+1+bit] = acc & 1;
      }
    }
}

CBoard.prototype.formRoom = function (j, i, info) {
  const getOffset = (n) => !n ? -1 : n >> 1;
  const
    a = this.board,
    y = j*4 + 1,
    x = i*4 + 1

  const fillRoom = (y, x) => {
    for (let dy = 0; dy < 4; dy++)
      for (let dx = 0; dx < 4; dx++) {
        if (dy ===3 && dx === 3) continue;
        a[y+dy][x+dx] = 0
      }
  }
  const digRoom = (y, x) => {
    for (let dy = 0; dy < 3; dy++)
      for (let dx = 0; dx < 3; dx++) {
        a[y+dy][x+dx] = 1
      }
  }

  const digPassage = (y, x, info) => {
    // openSides > 1
    const
      a = this.board,
      horizontal = getOffset(info[0] | info[2]),
      vertical = getOffset(info[1] | info[3])

    if (horizontal > -1) {
      const [d0, d1] = [info[0]? 0 : vertical, info[2]? 2 : vertical]
      for (let d = d0; d <= d1; d++)
        a[y + horizontal][x + d] = 1
    }
    if (vertical > -1) {
      const [d0, d1] = [info[1]? 0 : horizontal, info[3]? 2 : horizontal]
      for (let d = d0; d <= d1; d++)
        a[y + d][x + vertical] = 1
    }
  }

  const openSides = info.reduce((a, v) => a + !!v, 0)
  const toDigRoom = openSides === 1
    || countBits(info[0] | info[2]) > 1
    || countBits(info[1] | info[3]) > 1

  if (toDigRoom) {
    digRoom(y, x)
    return
  }
  // else
  digPassage(y, x, info)
}

CBoard.prototype.buildRooms = function () {
  const
    cfg = this.cfg,
    mapInfo = this.mapInfo,
    NX = (cfg.resX-1) / 4,
    NY = (cfg.resY-1) / 4

  for (let j = 0; j < NY; j++)
    for (let i = 0; i < NX; i++) {
      this.formRoom(j, i, mapInfo[j][i])
    }
}

CBoard.prototype.renderBoard = function() {
  const
    cfg = this.cfg,
    a = this.board
  writeln('<div class=board>')
  for (let j = 0; j < cfg.resY; j++) {
    for (let i = 0; i < cfg.resX; i++) {
      const n = a[j][i]
      const cl = cfg.isShown && !this.shown(j, i) ? 'fog' : `c${n}`
      write(`<div class="c ${cl}"></div>`)
      // if (cfg.isShown) {
      //   // exploration
      //   write(`<div class="c ${cl}" onclick="app.markToShow(${j}, ${i})"></div>`)
      // } else {
      //   // always visiable
      //   write(`<div class="c ${cl}"></div>`)
      // }
    }
    writeln('')
  }
  writeln('</div>')
}
