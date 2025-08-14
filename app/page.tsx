import React from "react";
import Widgets from "./lib/Components/Advanced/Widgets";
import Bar from "./lib/Components/Advanced/Bar";
import Calender from "./lib/Components/Advanced/Calender";
import LockScreen from "./lib/Components/Advanced/LockScreen";

const page = () => {
    // row = row + false (0)
    const days = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
    ];

    return (
        <div>
            <table border={1}>
                <tbody>
                    {days.map((rows, rowindex) => (
                        <tr key={rowindex}>
                            {rows.map((col, colIndex) => (
                                <td key={colIndex}>{col}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default page;
