import app from "./app";
import sequelize from "./database";
import { eventBettingTip } from "./module/tip.create.module";
import { filterTips } from "./module/tip.filter.module";

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    eventBettingTip();
    filterTips();
  });
});
