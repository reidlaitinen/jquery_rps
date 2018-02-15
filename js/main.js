$(document).ready( function () {
  $('.computerOption').hide()

  function clearFrames() {
    $('.winBorder').removeClass('winBorder')
    $('.loseBorder').removeClass('loseBorder')
  }

  function showComputerChoice(computerChoice) {
    
    var choiceID = "#computer-" + computerChoice + "-img"
    console.log("un-hiding #" + choiceID)
    $(choiceID).show()

  }

  function addFrames(winnerChoice, loserChoice, winner, loser) {
    $('#' + winner + "-" + winnerChoice + "-img").addClass('winBorder')
    $('#' + loser + "-" + loserChoice + "-img").addClass('loseBorder')

  }


  function displayResult(winner) {
  

  }

  function getResult(userChoice, computerChoice) {
    console.log("evaluating " + userChoice + " vs " + computerChoice)
    
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
    $('.computerOption').hide()
    clearFrames()
    userChoice = userChoice.replace('user-', '')
    userChoice = userChoice.replace('-img', '')
    console.log("starting game")
    console.log("userChoice = " + userChoice)
    console.log("computerChoice = " + computerChoice)

    showComputerChoice(computerChoice)

    var winner = getResult(userChoice, computerChoice)
    if (winner == 'user') {
      addFrames(userChoice, computerChoice, 'user', 'computer')
      displayResult('user')
    } else if (winner == 'computer') {
      addFrames(computerChoice, userChoice, 'computer', 'user')
      displayResult('computer')
    } else {
      clearFrames()
      displayResult('tie')
    }
  }

  // listen for click on any element with userOption class
  $('.userOption').on('click', function() {

    console.log("clicked element: #" + this.id)
    startGame(
      this.id,
      ['rock','paper','scissors'][Math.floor(Math.random() * 3)]
    )

  })


// end document.ready block
})