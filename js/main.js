$(document).ready( function () {
  $('.computerOption').hide()
  $('.notify-badge').hide()

  var totalGames = 0

  var wins = {
    user: 0,
    computer: 0,
    neither: 0
  }

  var rockWins = {
    user: 0,
    computer: 0,
    percentage: 0.00
  }

  var paperWins = {
    user: 0,
    computer: 0,
    percentage: 0.00
  }

  var scissorsWins = {
    user: 0,
    computer: 0,
    percentage: 0.00
  }

  function clearFrames() {
    $('.winBorder').removeClass('winBorder')
    $('.loseBorder').removeClass('loseBorder')
  }

  function showComputerChoice(computerChoice) {
    var choiceID = "#computer-" + computerChoice + "-img"
    $(choiceID).show()
  }

  function addFrames(winnerChoice, loserChoice, winner, loser) {
    $('#' + winner + "-" + winnerChoice + "-img").addClass('winBorder')
    $('#' + loser + "-" + loserChoice + "-img").addClass('loseBorder')
  }

  function updateScore() {
    var userPercent = ((wins.user / totalGames) * 100).toFixed(2)
    var computerPercent = ((wins.computer / totalGames) * 100).toFixed(2)
    var tiePercent = ((wins.neither / totalGames) * 100).toFixed(2)
    $('#userScore').html('User score: ' + wins.user + " (" + userPercent + "%)")
    $('#computerScore').html('Computer score: ' + wins.computer + " (" + computerPercent + "%)")
    $('#ties').html('Ties: ' + wins.neither + " (" + tiePercent + "%)")

  }


  function badgeStuff(winnerChoice, loserChoice, winner, loser) {

    // hide all badges
    $('.notify-badge').hide()

    // build the string to find the winning badge based on class list
    var winnerBadgeClasses = '.notify-badge.' + winner + "." + winnerChoice

    // update text on badge-to-show, with info from object, then show the badge
    switch(winnerChoice) {
      case 'rock':
        $(winnerBadgeClasses)
          .html("Wins: " + rockWins[winner] + "<br>" + rockWins.percentage + "%")
          $(winnerBadgeClasses).show()
        break
      case 'paper':
        $(winnerBadgeClasses)
          .html("Wins: " + paperWins[winner] + "<br>" + paperWins.percentage + "%")
          $(winnerBadgeClasses).show()
        break
      case 'scissors':
        $(winnerBadgeClasses)
          .html("Wins: " + scissorsWins[winner] + "<br>" + scissorsWins.percentage + "%")
          $(winnerBadgeClasses).show()
        break
    }

  }


  function resultStuff(winnerChoice, winner) {
    switch (winnerChoice) {
      case 'rock':
        rockWins[winner] += 1
        rockWins.percentage = (((rockWins.user + rockWins.computer) / totalGames) * 100).toFixed(2)
        break
      case 'paper':
        paperWins[winner] += 1
        paperWins.percentage = (((paperWins.user + paperWins.computer) / totalGames) * 100).toFixed(2)
        break
      case 'scissors':
        scissorsWins[winner] += 1
        scissorsWins.percentage = (((scissorsWins.user + scissorsWins.computer) / totalGames) * 100).toFixed(2)
        break
    }
    console.log(paperWins.user)
    console.log(paperWins.computer)
    console.log(paperWins.percentage)

  }

  function getResult(userChoice, computerChoice) {
    
    if ((userChoice == 'rock' && computerChoice == 'scissors') ||
       (userChoice == 'paper' && computerChoice == 'rock') ||
       (userChoice == 'scissors' && computerChoice == 'paper')) {
      return 'user' }
      else if (userChoice == computerChoice) {
        return 'tie'
      } else {
        return 'computer'
      }
  }

  function startGame(userChoice, computerChoice) {
    totalGames++
    $('.computerOption').hide()
    $('.computerBadge').hide()
    clearFrames()
    userChoice = userChoice.replace('user-', '')
    userChoice = userChoice.replace('-img', '')

    showComputerChoice(computerChoice)

    var winner = getResult(userChoice, computerChoice)
    if (winner == 'user') {
      wins.user++
      addFrames(userChoice, computerChoice, 'user', 'computer')
      resultStuff(userChoice, 'user')
      badgeStuff(userChoice, computerChoice, 'user', 'computer')
      
    } else if (winner == 'computer') {
      wins.computer++
      addFrames(computerChoice, userChoice, 'computer', 'user')
      resultStuff(computerChoice, 'computer')
      badgeStuff(computerChoice, userChoice, 'computer','user')
      
    } else {
      wins.neither++
      clearFrames()
      $('.notify-badge').hide()
    }
    updateScore()
  }

  // listen for click on any element with userOption class
  $('.userOption').on('click', function() {

    startGame(
      this.id,
      ['rock','paper','scissors'][Math.floor(Math.random() * 3)]
    )
  })

// end document.ready block
})