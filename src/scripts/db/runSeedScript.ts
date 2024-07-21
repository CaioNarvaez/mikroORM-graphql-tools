import { config, initOrm, orm } from "../../config/orm";
import { clearDatabase } from "./clearDatabase";
import { seedDatabase } from "./seedDatabase";

(async () => {
    await initOrm({ config, migrateDb: true });
    await clearDatabase(orm.orm);
    await seedDatabase(orm.orm);
    console.log("Finished seeding database");
    process.exit(0);
})();