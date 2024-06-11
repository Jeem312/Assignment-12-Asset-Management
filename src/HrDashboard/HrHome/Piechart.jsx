import React from 'react';

import useAssets from '../../Hooks/useAssets';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

const Piechart = () => {
    const [assets] =useAssets();
    const nonReturnable= assets.filter(item=>item.productType==='NonReturnable') ;
    const nonReturnableLength = nonReturnable.length;
    const returnable= assets.filter(item=>item.productType==='ReturnAble') ;
    const returnableLength = returnable.length;
    console.log(returnableLength);
    const data = [
        { name: 'Returnable', value: returnableLength },
        { name: 'Non-Returnable', value: nonReturnableLength }
    ];

    const COLORS = ['#0088FE', '#FF8042'];
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default Piechart;