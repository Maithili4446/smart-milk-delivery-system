const StatCard = ({ title, value, icon: Icon, trend }) => {
    return (
        <div className="glass-card p-6 shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-[rgba(245,245,245,0.7)] mb-2">{title}</p>
                    <h3 className="text-3xl font-bold text-brand-text tracking-tight">{value}</h3>
                </div>
                <div className="p-3 bg-[rgba(255,255,255,0.05)] rounded-xl text-brand-highlight shadow-inner border border-[rgba(255,255,255,0.08)]">
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            {(trend !== undefined && trend !== null) && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={`font-medium flex items-center ${trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {trend > 0 ? (
                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        ) : trend < 0 ? (
                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        ) : null}
                        {Math.abs(trend)}%
                    </span>
                    <span className="text-gray-500 ml-2">vs last month</span>
                </div>
            )}
        </div>
    );
};

export default StatCard;
