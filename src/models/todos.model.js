import { DataTypes } from "sequelize";
import db from '../utils/database.js';


const Todo = db.define('todos', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    //title
    title: {
        type: DataTypes.STRING(30),
        allowNull: false, 
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});

export default Todo;