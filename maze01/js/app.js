const link = (name) => `<a href="${name}.htm">${name}</a>`

const renderHeader = () => {
  const files = ['a', 'b', 'c', 'l']
  const out = []
  for (const mode of [0, 1]) {
    for (const v of files) {
      out.push(link(mode + v))
    }
    out.push('<br>')
  }
  writeln(out.join(' '));
}

const renderApp = (renderCell) => {
  writeln('<div class=board>')
  const size = 16

  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      const cell = renderCell(j, i)
      write(cell)
    }
  }
  writeln('</div>')
}

const renderAppMono = () => {
  renderApp( (j, i) => {
      //const n = (i + j) & 1;
      const c = rand_bit()
      return `<div class=c${c}></div>`
  })
}

const renderAppDuo = () => {
  renderApp( (j, i) => {
      const n = (i + j) & 1;
      const c = rand_bit()
      return `<div class=c${c}${n}></div>`
  })
}
