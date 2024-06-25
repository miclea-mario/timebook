const getBadges = (user) => {
    const badges = user.badges;
    if (!badges) return [];

    return badges.map((badge) => {
        const badgeObj = {};
        if (badge.name === 'punctual-booker') {
            badgeObj.name = 'Punctual Booker';
            badgeObj.icon = '/images/punctual-booker.png';
        };
        if (badge.name === 'lazy-sloth') {
            badgeObj.name = 'Lazy Sloth';
            badgeObj.icon = '/images/lazy-sloth.png';
        };
        if (badge.name === 'i-do-it-for-the-pleasure') {
            badgeObj.name = 'I Do It For The Pleasure';
            badgeObj.icon = '/images/i-do-it-for-the-pleasure.png';
        };
        return badgeObj;
    });
  };
  
  export default getBadges;
  