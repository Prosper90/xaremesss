import cron from "node-cron";
import processStates from "../enums/processStates.js";
import Logger from "../middlewares/log.js";
import GemaScores from "../models/Gema.js";
import User from "../models/Users.js";
import XeetScores from "../models/Xeets.js";

class ArmeService {
  static async purchaseIncubateXeetCard(userId) {
    try {
      const user = await User.findOne({ userId });
      if (!user) {
        throw new Error("User not found");
      }

      const gemaRecord = await GemaScores.findOne({ userId: user._id });
      if (!gemaRecord) {
        throw new Error("Gema record not found for the user");
      }

      console.log(user.processState, "process state");

      if (user.processState !== processStates.NONE) {
        throw new Error(
          "You must complete the current process before proceeding"
        );
      }

      if (gemaRecord.gemaScore < 10) {
        throw new Error("Insufficient Gema to purchase incubate Xeet Card");
      }

      gemaRecord.gemaScore -= 10;
      await gemaRecord.save();

      user.processState = processStates.INCUBATING;
      await user.save();

      this.scheduleIncubationJob(user);

      return {
        success: true,
        message: "Incubate Xeet Card purchased successfully",
      };
    } catch (error) {
      Logger.logger.error("Error purchasing incubate Xeet Card:", error);
      throw error;
    }
  }

  static scheduleIncubationJob(user) {
    try {
      const incubationTimeInSeconds = 30;

      cron.schedule(`*/${incubationTimeInSeconds} * * * * *`, async () => {
        const updatedUser = await User.findOne({ userId: user.userId });
        if (
          updatedUser &&
          updatedUser.processState === processStates.INCUBATING
        ) {
          updatedUser.processState = processStates.GENERATING_ARME;
          await updatedUser.save();

          cron.stop();
        }
      });
    } catch (error) {
      Logger.logger.error("Error scheduling the incubation cron job:", error);
      throw error;
    }
  }

  static async generateArme(userId) {
    try {
      const user = await User.findOne({ userId });
      if (!user) {
        console.error("User not found");
        throw new Error("User not found");
      }

      if (user.processState !== processStates.GENERATING_ARME) {
        console.error(
          "User process state is not GENERATING_ARME for user:",
          userId
        );
        throw new Error(
          "Process state must be GENERATING_ARME to generate Arme"
        );
      }

      const gemaRecord = await GemaScores.findOne({ userId: user._id });
      if (!gemaRecord) {
        console.error("Gema record not found for user:", userId);
        throw new Error("Gema record not found for the user");
      }

      if (gemaRecord.gemaScore < 25) {
        console.error("Insufficient Gema score for user:", userId);
        throw new Error("Insufficient Gema to generate Arme");
      }

      gemaRecord.gemaScore -= 25;
      await gemaRecord.save();
      console.log("Updated Gema score successfully for user:", userId);

      user.processState = processStates.EXTRACTION_TO_TON;
      await user.save();
      console.log("Updated user process state for user:", userId);

      await this.scheduleGenerateArmeJob(user);

      return {
        success: true,
        message: "Arme generated successfully",
      };
    } catch (error) {
      Logger.logger.error("Error generating Arme:", error.message);
      throw error;
    }
  }

  static scheduleGenerateArmeJob(user) {
    try {
      const incubationTimeInSeconds = 5;

      cron.schedule(`*/${incubationTimeInSeconds} * * * * *`, async () => {
        const updatedUser = await User.findOne({ userId: user.userId });
        if (
          updatedUser &&
          updatedUser.processState === processStates.EXTRACTION_TO_TON
        ) {
          updatedUser.processState = processStates.EXTRACTION_TO_WALLET;
          await updatedUser.save();

          cron.stop();
        }
      });
    } catch (error) {
      Logger.logger.error("Error scheduling the cron job:", error);
      throw error;
    }
  }

  static async extractToTon(userId) {
    try {
      const user = await User.findOne({ userId });
      if (!user) {
        console.error("User not found");
        throw new Error("User not found");
      }

      if (user.processState !== processStates.EXTRACTION_TO_WALLET) {
        console.error(
          "User process state is not EXTRACTION_TO_WALLET for user:",
          userId
        );
        throw new Error(
          "Process state must be EXTRACTION_TO_WALLET to generate Arme"
        );
      }

      const gemaRecord = await GemaScores.findOne({ userId: user._id });
      if (!gemaRecord) {
        console.error("Gema record not found for user:", userId);
        throw new Error("Gema record not found for the user");
      }

      if (gemaRecord.gemaScore < 25) {
        console.error("Insufficient Gema score for user:", userId);
        throw new Error("Insufficient Gema to generate Arme");
      }

      gemaRecord.gemaScore -= 25;
      await gemaRecord.save();
      console.log("Updated Gema score successfully for user:", userId);

      const xeetRecord = await XeetScores.findOne({ userId: user._id });
      if (!xeetRecord) {
        console.error("Xeet record not found for user:", userId);
        throw new Error("Xeet record not found for the user");
      }

      if (xeetRecord.xeetScore < 0) {
        console.error("Insufficient Xeet score for user:", userId);
        throw new Error("Insufficient Xeet");
      }

      const xeetRate = 0.5;
      const armeAmount = xeetRecord.xeetScore * xeetRate;

      const extractionTimeInSeconds = 30;

      const task = cron.schedule(
        `*/${extractionTimeInSeconds} * * * * *`,
        async () => {
          try {
            const updatedUser = await User.findOne({ userId });
            if (!updatedUser) {
              console.error("Updated User not found during Cron execution");
              throw new Error("Updated user not found");
            }

            if (updatedUser.tonWalletDetails) {
              updatedUser.tonWalletDetails.tonBalance += armeAmount;
            } else {
              updatedUser.tonWalletDetails = { tonBalance: armeAmount };
            }

            xeetRecord.xeetScore = 0;
            await xeetRecord.save();

            await updatedUser.save();

            console.log(updatedUser, "updated user");
            console.log("Ton wallet credited successfully for user:", userId);

            updatedUser.processState = processStates.NONE;
            await updatedUser.save();

            console.log("Process state reset to NONE for user:", userId);

            task.stop();
          } catch (error) {
            Logger.logger.error(
              "Error during Ton wallet credit via Cron:",
              error
            );
            throw error;
          }
        }
      );

      return {
        success: true,
        message:
          "Started extraction to Ton. Wallet will be credited after 30 seconds.",
      };
    } catch (error) {
      Logger.logger.error("Error during Ton wallet credit:", error);
      throw error;
    }
  }
}

export default ArmeService;
