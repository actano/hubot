elasticsearch = require 'elasticsearch'
momentParser = require 'moment-parser'

STATS_QUERY_BLACKLIST = "NOT extra.user.email:(*actano* OR *test* OR *cleverbridge* OR *salz* OR *usersolutions* OR *tagebau* OR *bondis* OR *global-communication* OR *koelling-home* OR *skornyakov* OR *sly.mn* OR *bu-st* OR *rplan.com* OR *hueper.net*)"

loadStats = (esClient, startDate, endDate) ->
    esClient.search
        index: 'logstash-*'
        type: 'fluentd'
        size: 0
        body:
            aggs:
                isSubscriber:
                    terms:
                        field: 'extra.user.isSubscriber'
                    aggs:
                        uniqueUsers:
                            cardinality:
                                field: 'extra.user.id'
            query:
                bool:
                    filter: [
                        {query_string: {query: STATS_QUERY_BLACKLIST, analyze_wildcard: true}}
                        {exists: {field:'extra.operation'}}
                        {range: {'@timestamp': {gte: startDate, lte: endDate}}}
                    ]
    .then (result) ->
        buckets = result.aggregations.isSubscriber.buckets
        subscriberResult = buckets.filter (bucket) -> bucket.key is 1
        freeResult = buckets.filter (bucket) -> bucket.key is 0
        
        activeUsers:
            subscribers: subscriberResult[0]?.uniqueUsers.value ? 0
            free: freeResult[0]?.uniqueUsers.value ? 0


formatStats = (stats, startDate, endDate) ->
    """
    RPLAN Next Usage statistics from #{startDate} to #{endDate}:

    *Active Free Users:* #{stats.activeUsers.free}
    *Active Paying Users:* #{stats.activeUsers.subscribers}
    """

module.exports = (robot) ->
    esClient = new elasticsearch.Client
        host: process.env.HUBOT_ELASTICSEARCH_URL

    robot.respond /stats (.+) to (.+)$/i, (res) ->
        [_, rawStartDate, rawEndDate] = res.match
        startDate = momentParser.parseMoment(rawStartDate).toISOString()
        endDate = momentParser.parseMoment(rawEndDate).toISOString()
        
        loadStats(esClient, startDate, endDate)
            .then (stats) ->
                res.reply formatStats stats, rawStartDate, rawEndDate
            .catch (error) ->
                res.reply "Failed to execute query: \n#{error}"
