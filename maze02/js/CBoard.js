function CBoard(cfg) {
  this.init(cfg)
}

CBoard.prototype.init = function (cfg) {
  // cfg = {resX, resY, randBit}
  this.cfg = cfg
  this.board = matrix_filled(cfg.resY, cfg.resX, () => 0);
}

CBoard.prototype.buildMaze = function() {
  const
    cfg = this.cfg,
    NX = cfg.resX / 2,
    NY = cfg.resY / 2,
    rand_bit = cfg.randBit,
    a = this.board
  for (let j = 0; j < NY; j++)
    for (let i = 0; i < NX; i++) {
      const jj = 2 * j, ii = 2 * i
      a [jj]  [ii] = 0
      a [jj + 1][ii] = rand_bit()
      a [jj]  [ii + 1] = rand_bit()
      const n = ((j % 3 === 1) && (i % 3 === 1)) ? 11 : 1
      a [jj + 1][ii + 1] = n
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
