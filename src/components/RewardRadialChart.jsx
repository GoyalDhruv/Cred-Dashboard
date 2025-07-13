import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export function RewardRadialChart({ percentage }) {
    const data = [
        { name: 'Progress', value: percentage },
        { name: 'Remaining', value: 100 - percentage },
    ];

    const COLORS = ['url(#reward-gradient)', 'rgba(255, 255, 255, 0.1)'];

    return (
        <div className="relative w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <defs>
                        <linearGradient id="reward-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="hsl(var(--secondary))" />
                        </linearGradient>
                    </defs>

                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={2}
                        dataKey="value"
                        isAnimationActive={false}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} cornerRadius={10} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Animated Percentage in Center */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-2xl font-bold text-gradient"
                    >
                        {percentage}%
                    </motion.div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                </div>
            </motion.div>
        </div>
    );
}
