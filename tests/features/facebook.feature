Feature: Facebook Network

  Background:
    Given I create a Facebook Share Button with SDK enabled

  @facebook
  Scenario: Facebook network should be displayed and have no url
    When I click the Facebook Share Button
    Then I should see the Facebook button
    When I click the Facebook button
    Then I should have no url

  @facebook
  Scenario: Facebook network should be displayed and have the fallback URL
    When I click the Facebook Share Button
    Then I should see the Facebook button
    When the FB SDK is not loaded
    And I click the Facebook button
    Then I should have a PHP Facebook share url

  Background:
    Given I create a Facebook Share Button with SDK disabled

  @facebook
  Scenario: Facebook network should be displayed and have the fallback URL
    When I click the Facebook Share Button
    Then I should see the Facebook button
    When I click the Facebook button
    Then I should have a PHP Facebook share url
