function rand(limit) { return (Math.random()*limit)|0; }

function choice(abc) {
    const idx = rand(abc.length);
    return abc[idx];
}


function CBoard(cfg) {
  this.init(cfg)
}

CBoard.prototype.init = function (cfg) {
  // cfg = {resX, resY, randBit}
  this.cfg = cfg
  this.board = matrix_filled(cfg.resY, cfg.resX, 0);
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
    a = cube_filled(NY, NX, 4, 0)

  // * generate doors
  console.log('buildDoors: gen')
  for (let j = 0; j < NY; j++)
    for (let i = 0; i < NX; i++) {
      a[j][i][0] = !i ? 0 : a[j][i-1][2]
      a[j][i][1] = !j ? 0 : a[j-1][i][3]
      a[j][i][2] = i === NX - 1 ? 0 : rand_door()
      a[j][i][3] = j === NY - 1 ? 0 : rand_door()
    }
  this.mapInfo = a;
  console.log('buildDoors: mapInfo', a)
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

CBoard.prototype.renderBoard = function() {
  const
    cfg = this.cfg,
    a = this.board
  writeln('<div class=board>')
  for (let j = 0; j < cfg.resY; j++) {
    for (let i = 0; i < cfg.resX; i++) {
      const n = a[j][i]
      write(`<div class="c c${n}"></div>`)
    }
    writeln('')
  }
  writeln('</div>')
}
