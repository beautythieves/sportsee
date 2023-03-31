import React from "react";
import { getUserAverageSessions } from "../../../dataManager/dataManager";
import { useParams } from "react-router-dom";
/* import to create simple bar charts */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
