$('.data tbody tr[class]').each(function() {
  var row = $(this),
    nameCell = row.children(':eq(1)'),
    position = row.children(':eq(2)').text().trim(),
    teamSplit = row.children(':eq(3)').text().split('/'),
    team = teamSplit[0].trim(),
    bye = teamSplit[1].trim(),
    name = nameCell.text().trim(),
    link = nameCell
      .find('a')
      .first()
      .attr('href')
      .replace('..', 'http://subscribers.footballguys.com'),
    id = link.split('id=')[1],
    note = '',
    infoLink = nameCell.find('a:eq(1)')

  if (infoLink.length) {
    note = infoLink.attr('onmouseover').split('<p>')[1].split('</p>')[0]
  }

  players[id] = {
    name,
    link,
    position,
    team,
    bye,
    note,
  }
})

$('#x').val(JSON.stringify(players))
