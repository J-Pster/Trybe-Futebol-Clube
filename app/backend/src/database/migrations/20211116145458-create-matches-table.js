module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "home_team",
        references: {
          model: "teams",
          key: "id",
        },
      },
      homeTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "home_team_goals",
      },
      awayTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "away_team",
        references: {
          model: "teams",
          key: "id",
        },
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        field: "away_team_goals",
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        field: "in_progress",
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("matches");
  },
};