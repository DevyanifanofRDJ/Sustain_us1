function calculate(miles,energy,efficiency)
{
    const transportemissionfactor=8.89;
    const energyemissionfactor=0.92;

    const energyfoot=energy*energyemissionfactor;
    const transportfoot=(miles/efficiency)*transportemissionfactor;

    const total=energyfoot+transportfoot;
    return total;
}