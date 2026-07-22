import "dotenv/config";
import mongoose from "mongoose";
import connectDatabase from "../config/database.config";
import RoleModel from "../models/roles-permission.model";
import { RolePermissions } from "../utils/role-permission";

export const seedRoles = async () => {
  console.log("Seeding roles started...");

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      await RoleModel.updateOne(
        { name: role },
        { $set: { permissions } },
        { upsert: true, session }
      );
      console.log(`Role ${role} upserted with permissions.`);
    }

    await session.commitTransaction();
    console.log("Transaction committed.");

    session.endSession();
    console.log("Session ended.");

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

// Allow running this file directly: `npm run seed`
if (require.main === module) {
  (async () => {
    try {
      await connectDatabase();
      await seedRoles();
    } catch (error) {
      console.error("Error running seed script:", error);
    } finally {
      await mongoose.disconnect();
    }
  })();
}
