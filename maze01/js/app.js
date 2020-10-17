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

const renderAppMono = () => {
  writeln('<div class=board>')
  const size = 16

  for (let j = 0; j < size; j++) {
    for (var i = 0; i < size; i++) {
      //n = (i+j)&1;
      c = rand_bit()
      write(`<div class=c${c}></div>`)
    }
  }
  writeln('</div>')
}

const renderAppDuo = () => {
  writeln('<div class=board>')
  const size = 16

  for (let j = 0; j < size; j++) {
    for (var i = 0; i < size; i++) {
      n = (i+j)&1;
      c = rand_bit()
      write(`<div class=c${c}${n}></div>`)
    }
  }
  writeln('</div>')
}
