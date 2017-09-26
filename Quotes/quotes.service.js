angular.module("countryApp")
.factory('pnQuotesService', pnQuotesService)

function pnQuotesService() {

    return {
        quotes: quotes,
        getRandom: getRandom
    };

    function getRandom() {
        var quotes = this.quotes();
        while(!q) {
            var q = quotes[Math.floor(Math.random()*quotes.length)];
        }
        return q
    };

    function quotes() {
        return [

            ["When you smoke the herb, it reveals you to yourself",
             "Bob Marley"],

            ["The illegality of cannabis is outrageous, an impediment to full utilization of a drug which helps produce the serenity and insight, sensitivity and fellowship so desperately needed in this increasingly mad and dangerous world.",
            "Carl Sagan"],

            ["Why is marijuana against the law? It grows naturally upon our planet. Doesn’t the idea of making nature against the law seem to you a bit . . . unnatural?",
            "Bill Hicks"]

            ["Federal and state laws (should) be changed to no longer make it a crime to possess marijuana for private use.",
            "Richard M. Nixon"],

            ["The amount of money and of legal energy being given to prosecute hundreds of thousands of Americans who are caught with a few ounces of marijuana in their jeans simply makes no sense - the kindest way to put it. A sterner way to put it is that it is an outrage, an imposition on basic civil liberties and on the reasonable expenditure of social energy.",
            "William F. Buckley Jr."],

            ["Penalties against possession of a drug should not be more damaging to an individual than the use of the drug itself; and where they are, they should be changed. Nowhere is this more clear than in the laws against possession of marijuana in private for personal use... Therefore, I support legislation amending Federal law to eliminate all Federal criminal penalties for the possession of up to one ounce [28g] of marijuana.",
            "Jimmy Carter"],

            ["Is marijuana addictive? Yes, in the sense that most of the really pleasant things in life are worth endlessly repeating.",
            "Richard Neville"],

            ["In strict medical terms marijuana is far safer than many foods we commonly consume. For example, eating 10 raw potatoes can result in a toxic response. By comparison, it is physically impossible to eat enough marijuana to induce death. Marijuana in its natural form is one of the safest therapeutically active substances known to man. By any measure of rational analysis marijuana can be safely used within the supervised routine of medical care.",
            "Francis Young, DEA Administrative Law Judge - 1988"],

            ["And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat.",
            "Anonymous, Holy Bible: King James Version"],

            ["Why use up the forests which were centuries in the making and the mines which required ages to lay down, if we can get the equivalent of forest and mineral products in the annual growth of the hemp fields?",
            "Henry Ford"],

            ["Of course I know how to roll a joint.", "Martha Stewart"],

            ["Herb is the healing of a nation, alcohol is the destruction.",
            "Bob Marley"],

        ];
    }


};
