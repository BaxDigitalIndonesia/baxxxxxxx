
//function get os and version os


export function getOSAndVersion(userAgent: string) {
    // customer'Windows '
    if (userAgent.includes("Windows NT")) {
        const match = userAgent.match(/Windows NT (\d+\.\d+);.*\s(x86|x64)/);
        if (match) {
            const version = `Windows ${match[1]}`;
            const architecture = match[2] ? match[2] : "Unknown";
            return `${version} ${architecture}`;
        }
        return "Windows NT (Unknown Version)";
    }

    //customer 'Mac OS X' customer
    if (userAgent.includes("Mac OS X")) {
        const match = userAgent.match(/Mac OS X (\d+[_]\d+[_]\d+)/);
        return match
            ? `Macintosh Intel Mac OS X ${match[1].replace(/_/g, ".")}`
            : "Mac OS X (Unknown Version)";
    }

    // customer linux
    if (userAgent.includes("Linux")) {
        const match = userAgent.match(/(Linux).*?(Android \d+)/);

        if (match) {
            return `${match[1]} ${match[2]}`;
        } else {
            return "unknow";
        }
    }

    // customer'iPhone' atau 'iPad'
    if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
        const match = userAgent.match(/OS (\d+[_]\d+)/);
        return match
            ? `iPhone OS ${match[1].replace(/_/g, ".")}`
            : "iPhone OS (Unknown Version)";
    }

    // customer Unknown OS
    return "Unknown OS";
}