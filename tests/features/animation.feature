Feature: Collision Detection

  Background:
    Given I create an Animated Share Button

  @animation
  Scenario: Classes will be porperly adjusted according to Share Button position
    Then The classes will be correct at middle center
    Then The classes will be correct at bottom left
    Then The classes will be correct at middle left
    Then The classes will be correct at top left
    Then The classes will be correct at top center
    Then The classes will be correct at top right
    Then The classes will be correct at middle right
    Then The classes will be correct at bottom right
    Then The classes will be correct at bottom center
