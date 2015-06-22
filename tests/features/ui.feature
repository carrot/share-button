Feature: UI Options

  Background:
    Given I create a UI Share Button

  @ui
  Scenario: Test UI Options
    Then The Share Button should have the correct text
    Then The buttons should have the correct class
