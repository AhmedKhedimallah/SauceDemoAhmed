
import { Then } from "@badeball/cypress-cucumber-preprocessor";
import OverviewPage from "../../pages/overview.pages";

Then("the total price should be correct", () => {
  OverviewPage.verifyTotalPrice();
});