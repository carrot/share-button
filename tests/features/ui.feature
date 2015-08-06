Feature: UI Options

  Background:
    Given I create a UI Share Button

  @ui
  Scenario: User UI options should be implemented
    Then The Share Button should have the correct text
    And The buttons should have the correct classes
