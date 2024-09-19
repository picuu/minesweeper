import { loadFeature, defineFeature } from 'jest-cucumber'
import * as steps from './steps/minesweeper.steps'

const feature = loadFeature('./tests/features/minesweeper.web.feature')

defineFeature(feature, (test) => {
  test('Starting game, default game status is waiting, the button status show a happy face', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    then('the button status should show a happy face', () => {
      expect(steps.isHappyFace()).toBe(true)
    })
  })

  test('Waiting status, the timer should be 0', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    then(/^the timer should be (\d+)$/, (timerValue) => {
      console.log(steps.getTimerValue())
      expect(steps.getTimerValue()).toBe(Number(timerValue))
    })
  })

  test('Waiting status, the remaining mines counter show the number of hidden mines, by default, 10', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    then(/^the remaining mines counter should be (\d+)$/, (minesAmount) => {
      expect(steps.getMineCounterValue()).toBe(Number(minesAmount))
    })
  })

  test('Waiting status, the minefield has all the cells covered', ({ given, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    then('all the minefield cells should be covered', () => {
      expect(steps.areAllCellsCovered()).toBe(true)
    })
  })

  test('Waiting status, remaining clicking a cell, the game status should be playing, the button status show a happy face', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })

    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })

    then('the button status should show a happy face', () => {
      expect(steps.isHappyFace()).toBe(true)
    })
  })

  test('Waiting status, right clicking a cell, the game status should be playing', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsMined(rowPosition, colPosition)
    })

    then('the button status should show a happy face', () => {
      expect(steps.isHappyFace()).toBe(true)
    })
  })

  test('Playing status, the remaining mines counter show the number of hidden mines', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })

    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })

    then(/^the remaining mines counter should show "(.*)"$/, (minesAmount) => {
      expect(steps.getMineCounterValue()).toBe(Number(minesAmount))
    })
  })

  test('Playing status, the timer starts', ({ given, when, and, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })

    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })

    and(/^the user waits "(.*)" second$/, async (seconds) => {
      await new Promise(resolve => setTimeout(resolve, (Number(seconds) * 1000)))
    })

    then(/^the timer should show a number greater than "(.*)"$/, async (seconds) => {
      expect(steps.getTimerValue() > Number(seconds)).toBe(true)
    })
  })

  test('The user wins the game, the button status show a happy face with sunglasses', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })

    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })

    then('the button status should show a happy face with sunglasses', () => {
      expect(steps.isWinFace()).toBe(true)
    })
  })

  test('The user loses the game, the button status show a sad face', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })

    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })

    then('the button status should show a sad face', () => {
      expect(steps.isDeadFace()).toBe(true)
    })
  })

  test('the user clicks on the button status, the game is waiting', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    when('the player clicks on the button status', () => {
      steps.clickStatusButton()
    })

    then('the button status should show a happy face', () => {
      expect(steps.isHappyFace()).toBe(true)
    })
  })

  test('Tagging a cell as mine, the remaining mines counter decrease', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })

    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPostition, colPosition) => {
      steps.tagCellAsMined(rowPostition, colPosition)
    })

    then(/^the remaining mines counter should be "(.*)"$/, (mineCountValue) => {
      expect(steps.getMineCounterValue()).toEqual(Number(mineCountValue))
    })
  })

  test('Untagging a cell as mine, the remaining mines counter increase', ({ given, and, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })

    and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsMined(rowPosition, colPosition)
    })

    when(/^the player untags the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.untagCell(rowPosition, colPosition)
    })

    then(/^the remaining mines counter should be "(.*)"$/, (mineCounterValue) => {
      expect(steps.getMineCounterValue()).toEqual(Number(mineCounterValue))
    })
  })

  test('Tagging as mined more cells than the number of mines, the remaining mines counter is negative', ({ given, and, when, then, pending }) => {
    given('the player opens the game', () => {
      pending()
    })

    given('the player loads the following mock data', (docString) => {
      pending()
    })

    and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })

    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })

    then(/^the remaining mines counter should be "(.*)"$/, (arg0) => {
      pending()
    })
  })

  test('Tagging a cell as inconclusive, the remaining mines counter remains equal', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })

    when(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsInconclusive(rowPosition, colPosition)
    })

    then(/^the remaining mines counter should be "(.*)"$/, (mineCounterValue) => {
      expect(steps.getMineCounterValue()).toEqual(Number(mineCounterValue))
    })
  })

  test('Change tag from mined to inconclusive, the remaining mines counter increase', ({ given, and, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })

    and(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsMined(rowPosition, colPosition)
    })

    when(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsInconclusive(rowPosition, colPosition)
    })

    then(/^the remaining mines counter should be "(.*)"$/, (mineCounterValue) => {
      expect(steps.getMineCounterValue()).toEqual(Number(mineCounterValue))
    })
  })

  test('Change tag from inconclusive to mined, the remaining mines counter decrease', ({ given, and, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })

    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })

    and(/^the player tags as inconclusive the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsInconclusive(rowPosition, colPosition)
    })

    when(/^the player tags as mined the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.tagCellAsMined(rowPosition, colPosition)
    })

    then(/^the remaining mines counter should be "(.*)"$/, (mineCounterValue) => {
      expect(steps.getMineCounterValue()).toEqual(Number(mineCounterValue))
    })
  })
})
