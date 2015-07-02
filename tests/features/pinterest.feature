Feature: Pinterest Network

  Background:
    Given I create a Pinterest Share Button

  @pinterest
  Scenario: Display Pinterest Network
    When I click the Pinterest Share Button
    Then I should see the Pinterest button
    When I click the Pinterest button
    Then I should have a correct Pinterest share url
