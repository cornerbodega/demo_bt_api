angular.module('countryApp')
.controller('pnCustomerDevelopmentChecklistsController', pnCustomerDevelopmentChecklistsController)

function pnCustomerDevelopmentChecklistsController($scope, pnDB, customerDevelopmentChecklistItems, $window) {
    $scope.checklists = checklists()
    $scope.showEdit = {}
    $scope.complete = {}
    $scope.comments = {}

    console.log(customerDevelopmentChecklistItems.data);
    formatCustomerDevelopmentChecklistItems()
    function getCustomerDevelopmentChecklistItems() {
        pnDB.getFromDB('select * from customerDevelopmentChecklistItems').then(function (res) {
            console.log(res.data);
            formatCustomerDevelopmentChecklistItems(res.data)
        })
    }
    function formatCustomerDevelopmentChecklistItems(params) {
        var data = customerDevelopmentChecklistItems.data
        if (params) data = params
        _.map(data, function (d) {
            _.map($scope.checklists,function (ch) {
                _.map(ch.promptGroups, function (pg) {
                    _.map(pg.prompts, function (p) {
                        if (p.id != d.id) return
                        $scope.comments[p.id] = d.comment
                        if (d.complete === "1") d.complete = true
                        $scope.complete[p.id] = d.complete
                        p.at = d.at /1000
                    })
                })
            })
        })
    }
    $scope.saveProgress = function (c) {
        pnDB.saveToDB('customerDevelopmentChecklistItems', {
            id: c.id,
            comment: $scope.comments[c.id],
            complete: $scope.complete[c.id],
            at: Date.now()

        }).then(function (res) {
            console.log(res);
            // $window.location.reload()

            getCustomerDevelopmentChecklistItems()
            $scope.showEdit[c.id] = false

        })
    }

    function pnFindById(f, id) {
        return _.findWhere(f(), {id: id})
    }
    function checklists() {
        var c = [
            {
                l: 'Board And Management Buy In',
                id: 'board_and_management_buy_in',
                goal: 'Agreement among investors, founders, and team on commitment to the Customer Development Process.',
                promptGroups: [
                    {
                        l: 'Reference: Chapter 2, Manifesto Rule #14',
                        id: 'reference_chapter_2_manifesto_rule_14',
                        prompts: [
                            {
                                l: 'Commit to use of Business Model and Market Type.',
                                id: 'commit_to_use_of_business_model_and_market_type'
                            },
                            {
                                l: 'Understand the Difference between "search for a busines model" and "execute a business plan"',
                                id: 'understand_the_difference_between_search_for_a_business_model_and_execute_a_business_plan'
                            },


                        ]
                    },
                    {
                        l: 'Customer Development Process emphasizes learning and discovery',
                        id: 'customer_development_process_emphasizes_learning_and_discovery',
                        prompts: [
                            {
                                l: 'Is there board and founding team funding and buy-in for this process?',
                                id: 'is_there_funding_and_buy_in_for_this_process',
                            },
                        ]
                    },
                    {
                        l: 'Discuss Market Type (initial decision)',
                        id: 'discuss_market_type_initial_decision',
                        prompts: [
                            {
                                l: 'Discuss Market Type: Existing, Segmented, New, or Clone?',
                                id: 'existing_segmented_new_or_clone',
                            },
                        ]
                    },
                ]
            },
            {
                l: 'The Customer Development Team',
                id: 'the_customer_development_team',
                goal: 'Set up the Customer Development Team',
                promptGroups: [
                    {
                        l: 'Reference: Chapter 2, Manifesto Rule #1',
                        id: 'reference_chapter_2_manifesto_rule_1'
                    },
                    {
                        l: 'Review the organizational differences between Customer Development and the traditional product introduction process',
                        id: 'review_the_organizational_differences_between_customer_development_and_the_traditional_product_introduction_process',
                        prompts: [
                            {
                                l: 'Founders Spend Time Outside The Building',
                                id: 'founders_spend_time_outside_the_building',
                            },
                            {
                                l: 'No VP of Sales or Marketing',
                                id: 'no_vp_of_sales_or_marketing',
                            },
                            {
                                l: 'Initial team responsibilities',
                                id: 'initial_team_responsibilities',
                            },
                        ]
                    },
                    {
                        l: 'Team Setup and Goals',
                        id: 'team_setup_and_goals',
                        prompts: [
                            {
                                l: 'Agree on who leads the team',
                                id: 'agree_on_who_leads_the_team',
                            },
                            {
                                l: 'Agree on the "getting out of the building" methodology',
                                id: 'agree_on_the_getting_out_of_the_building_methodology',
                            },
                            {
                                l: 'Agree on the team roles for each of the four Customer Development Steps',
                                id: 'agree_on_the_team_roles_for_each_of_the_four_customer_development_steps',
                            },
                        ]
                    },
                    {
                        l: 'Enumerate 3 to 5 Core Values of the Founding Team',
                        id: 'enumerate_3_to_5_core_values_of_the_founding_team',
                        prompts: [
                            {
                                l: 'Not a Mission Statement, Not about Profit or Products. Core ideology is about what the company believes in',
                                id: 'not_a_mission_statement',
                            },


                        ]
                    },

                ],
            },
            {
                l: 'Market Size',
                id: 'market_size',
                goal: 'Estimate the total market opportunity for the company',
                promptGroups: [
                    {
                        l: 'Reference: Chapter 4: Market Size Hypothesis',
                        id: 'reference_chapter_4_market_hypothesis',
                        checklist: 'market_size',
                    },
                    {
                        l: 'Estimated Market Size',
                        id: 'esitmated_market_size',
                        checklist: 'market_size',
                        prompts: [
                            {
                                l: 'TAM or Total Available Market',
                                id: 'tam_or_total_available_market',
                            },
                            {
                                l: 'SAM or Total Available Market',
                                id: 'sam_or_total_servable_market',
                            },
                            {
                                l: 'Target Market',
                                id: 'target_market',
                            },
                        ]
                    },

                    {
                        l: 'Appropriate metric for measuring determined',
                        id: 'approptiate_metric_for_measuring_determined',
                        checklist: 'market_size',
                        prompts: [
                            {
                                l: 'Units / Dollars / Page Views / Other Measures?',
                                id: 'units_dollars_page_views_other_measures',
                            },
                            {
                                l: 'Per Member for Susbcription services',
                                id: 'per_member_subscription_services',
                            },
                            {
                                l: 'Research the size of the overall market',
                                id: 'research_the_size_of_the_overall_market',
                            },
                        ]
                    },
                    {

                        l: 'If assessing a new market, the opportunities are estimated based on proxies and adjacent markets',
                        id: 'if_accessing_a_new_market_the_opportunities',
                        checklist: 'market_size',
                        prompts: [
                            {
                                l: 'Will the product encourage switching?',
                                id: 'will_the_product_encourage_switching',
                            },
                            {
                                l: 'Only the switchable subset counted (beware of long-term lock-ins from incumbents)',
                                id: 'only_the_switchable_subset_counted',
                            },

                            {
                                l: 'Growth computed for all customers sources over 3-5 years',
                                id: 'growth_computed_for_all_customers_sources',
                            },
                            {
                                l: 'Are there comparable companies?',
                                id: 'are_there_comperable_companies',
                            },
                            {
                                l: 'Have others grown as fast as the estimate?',
                                id: 'have_others_grown_as_fast_as_the_estimate',
                            },
                            {
                                l: 'Why will this company perform similarly?',
                                id: 'why_will_this_company_perform_similarly',
                            },
                        ]
                    },
                    {
                        l: 'Market Size Exit Criteria',
                        id: 'market_size_exit_criteria',
                        checklist: 'market_size',
                        prompts: [
                            {
                                l: 'Written sense of market size, estimate of how much the company can capture',
                                id: 'written_sense_of_market_suze_estimate_of_how_much',
                            },
                            {
                                l: 'Market Size Pass/Fail tests identified',
                                id: 'market_size_pass_fail',
                            },

                        ]
                    },

                ]

            },
            {
                l: 'Product Vision',
                id: 'product_vision',
                goal: 'Team agreement on the long-term vision and 18-month schedule',
                promptGroups: [
                    {
                        l: 'Reference: Chapter 4, Value Proposition Hypothesis/Product Vision',
                    },
                    {
                        l: 'Vision',
                        prompts: [
                            {
                                l: "What's your long-term vision for your company?",
                                id: 'long_term_vision'
                            },
                            {
                                l: "What do you ultimately want to change or solve?",
                                id: 'ultimately_change_or_solve'
                            },
                            {
                                l: "Are you going to do it with a series of products?",
                                id: 'series_of_products'
                            },
                            {
                                l: "How do you expand into adjacent markets?",
                            },
                            {
                                l: 'Do you need people to change their behavior?'
                            },
                            {
                                l: 'What will the world look like 3 years after you arrive on the scene? Five years?'
                            },
                            {
                                l: 'Put together a short narrative in bullets about your strategy'
                            },
                        ]
                    },
                    {
                        l: 'Delivery Dates',
                        prompts: [
                            {
                                l: 'MVP Delivery Date and features'
                            },
                            {
                                l: '18-month product vision and delivery dates'
                            },
                        ]
                    },
                    {
                        l: 'Long Term Product Strategy',
                        p: [
                            {
                                l: 'Will your product create network effects?'
                            },
                            {
                                l: 'Can you price it with a predictable model?'
                            },
                            {
                                l: 'Can you create customer lock-in / high switching costs?'
                            },
                            {
                                l: 'Can you have high gross margins?'
                            },
                            {
                                l: 'Does it have organic demand versus requiring marketing spend?'
                            },
                            {
                                l: 'List product enhacements anticipated up to 18 months'
                            },
                            {
                                l: 'List key follow-on product enhacements'
                            },
                        ]
                    },
                    {
                        l: 'Product Vision Exit Criteria',
                        p: [
                            {
                                l: 'Vision'
                            },
                            {
                                l: 'Narrative'
                            },
                            {
                                l: 'Long-term product strategy'
                            },
                        ]
                    },
                ]
            },
            {
                l: 'Product Features and Benefits',
                p: [
                    {
                        l: 'Reference: Chapter 4, Product Features / Benefits Hypotheses and Low-Fidelity MVP Hypotheses'
                    },
                    {
                        l: 'What problem are you solving?',
                        p: [
                            {
                                l: 'What do you think the biggest pain is in how customers work?'
                            },
                            {
                                l: 'If they could wave a magic wand and change anything what would it be?'
                            },
                            {
                                l: 'How does the product solve those problems or needs?'
                            },
                            {
                                l: 'What do people do today to solve their problem?'
                            }
                        ]
                    },
                    {
                        l: 'Product Feature List',
                        p: [
                            {
                                l: '10 one or two sentence descriptions of product features'
                            },
                            {
                                l: 'Explain the general goal of the product'
                            },
                            {
                                l: 'Does it address a market niche or segment?'
                            },
                            {
                                l: 'Does it address a market need in a new, different, faster or cheaper way?'
                            }
                        ]
                    },
                    {
                        l: 'Product Benefits List',
                        p: [
                            {
                                l: 'List the benefits through the customer\'s eyes'
                            },
                            {
                                l:'Something new? Better? More? Faster? Cheaper? Etc.'
                            },
                            {
                                l:'Benefits for each feature'
                            },
                            {
                                l: 'Will these benefits be accepted as such or do they need explanation?'
                            }
                        ]
                    },
                    {
                        l: 'Describe the MVP',
                        p: [
                            {
                                l: 'What do you want to learn?'
                            },
                            {
                                l: 'From who?'
                            },
                            {
                                l: 'What is the smallest feature set?'
                            }
                        ]
                    },
                    {
                        l: 'Create a One-Page User Story',
                        p: [
                            {
                                l: 'Include product vision, features, benefits'
                            }
                        ]
                    },
                    {
                        l: 'Product Features and Benefits Exit Criteria',
                        p: [
                            {
                                l: 'Describe the product\'s features and benefits'
                            },
                            {
                                l: 'Describe the MVP'
                            },
                            {
                                l: 'Create a User Story describing what the product will do'
                            },
                            {
                                l: 'Product Features and Benefits Pass / Fail Tests identified'
                            },
                        ]
                    }

                ]
            },
            {
                l: 'Channels',
                goal: "Develop a hypothesis of your distribution channel",
                p: [
                    {l: 'Reference: Chapter 4, Channel Hypothesis'},
                    {l: 'What channel will users use to buy from you?'},
                    {
                        l: 'Draw the Distribution Channel Diagram',
                        p: [
                            {
                                l: 'How much will the channel cost (direct expensees or channel discounts)',
                            },
                            {
                                l: 'Are there indirect channel costs (presales support, promotional dollars...)'
                            },
                            {
                                l: 'What else is needed for customers to use/buy the product?'
                            },
                            {
                                l: 'How do they acquire those pieces?'
                            },
                            {
                                l: 'What is net revenue after channel costs?'
                            }
                        ]
                    },
                    {
                        l: 'Channels Exit Criteria',
                        p: [
                            {
                                l: 'Channels Pass / Fail Tests Identified'
                            }
                        ]
                    }
                ]
            },
            {
                l: 'Market Type',
                goal: 'Select an initial Market Type',
                p: [
                    {
                        l: 'Reference: Chapter 4, Market Type',
                        p: [
                            {
                                l: 'Do you have a new product in an existing market?'
                            },
                            {
                                l: 'Do you want to clone and existing market?'
                            },
                            {
                                l: 'Do you need to redefine/refreme a market?'
                            }
                        ]
                    },
                    {
                        l: 'Or do you want to create an entirely new market?',
                        p: [
                            {
                                l: 'Is your product/service a substitute for something customers already have?'
                            },
                            {
                                l: 'Is it a replacement?'
                            },
                            {
                                l: 'Is it a variant on something out there, but can be respun into something new?'
                            },
                            {
                                l: 'Is it something totally new?'
                            }
                        ]
                    },
                    {
                        l: 'Positioning in an Existing Market You Want to Resegment',
                        p: [
                            {
                                l: 'Define the basis of competition',
                            },
                            {
                                l: 'Who is driving the existing market?'
                            },
                            {
                                l: 'Do you have some advantage or appeal among any vertical or horizontal market segment?'
                            },
                        ]
                    },
                    {
                        l: 'Market Type Exit Criteria',
                        p: [
                            {
                                l: 'Market Type Pass/Fail Tests Development'
                            }
                        ]
                    }
                ]
            },
            {
                l: 'Customer Relationships',
                goal: 'How you will Get Keep and Grow Customers',
                p: [
                    {
                        l: 'Draw your Get Grow Keep Funnel'
                    },
                    {
                        l: 'Describe you Get Get Customers Strategy',
                        p: [
                            {
                                l: 'Awareness'
                            },
                            {
                                l: 'Interest'
                            },
                            {
                                l: 'Consideration'
                            },
                            {
                                l: 'Purchase'
                            },
                        ]
                    },
                    {
                        l: 'What are your Get Customers Tactics?',
                        p: [
                            {
                                l: 'Earned Media?'
                            },
                            {
                                l: 'Paid Media?'
                            },
                        ]
                    },
                    {
                        l: 'Describe your Keep Customers Strategy',
                        p: [
                            {
                                l: 'Interact'
                            },
                            {
                                l: 'Retain'
                            },
                        ]
                    },
                    {
                        l: 'What are your Keep Customers Tactics?',
                        p: [
                            {
                                l: 'Loyalty programs?'
                            },
                            {
                                l: 'Product updates?'
                            },
                            {
                                l: 'Customer Surveys?'
                            },
                        ]
                    },
                    {
                        l: 'Describe your Grow Customers Strategy',
                        p: [
                            {
                                l: 'New Revenue from existing customers'
                            },
                            {
                                l: 'Customer Referrals'
                            },
                        ]
                    },
                    {
                        l: 'What are your Grow Customers Tactics?',
                        p: [
                            {
                                l: 'Referral Generation Programs to test'
                            },
                        ]
                    },
                    {
                        l: 'Customer Relationships Exit Criteria',
                        p: [
                            {
                                l: 'A preliminary first hypothesis of all Get/Keep/Grow Activities'
                            },
                        ]
                    },
                ]
            },
            {
                l: 'Key Resources Hypothesis',
                Goal: 'Itentify external resoures to the company\'s success, and how the company will find and secure them',
                p: [
                    {
                        l: 'Describe all key resources costs, and how they will be acquired',
                        p: [
                            {
                                l: 'Physical resources',
                            },
                            {
                                l: 'Financial resources',
                            },
                            {
                                l: 'Human resources',
                            },
                            {
                                l: 'Intellectual property',
                            },
                            {
                                l: 'Other key resources',
                            },
                            {
                                l: 'Dependency analysis',
                            },
                        ]
                    },
                    {
                        l: 'Key Resources Hypothesis Exit Criteria',
                        p: [
                            {
                                l: 'Resources required',
                            },
                            {
                                l: 'What they will cost',
                            },
                            {
                                l: 'Where they\'ll be found',
                            },
                            {
                                l: 'How they will be secured',
                            },
                        ]
                    },
                ]
            },
            {
                l: 'Partners Hypothesis',
                p: [
                    {
                        l: 'Understand Potential Partner Types',
                        p: [
                            {
                                l: 'Strategic Alliances',
                            },
                            {
                                l: 'Joint new business efforts',
                            },
                            {
                                l: 'Cooperation',
                            },
                            {
                                l: 'Key Suppliers',
                            },
                            {
                                l: 'Traffic Parters',
                            },
                        ]
                    },
                    {
                        l: 'List your target partners',
                        p: [
                            {
                                l: 'Necessary partners',
                            },
                            {
                                l: 'What they will provide',
                            },
                            {
                                l: 'How the company will reciprocate',
                            },
                        ]
                    },
                    {
                        l: 'Partners Hypothesis Exit Criteria',
                        p: [
                            {
                                l: 'Understand potential partner types',
                            },
                            {
                                l: 'List target partners, their constributions and what the company will offer in return',
                            },
                            {
                                l: 'Partners Hypothesis Pass/Fail tests identified',
                            },
                        ]
                    },
                ]
            },
            {
                l: 'Revenue and Pricing Hypothesis',
                goal: 'See if the business model makes financial sense',
                p: [
                    {
                        l: 'How many will we sell?',
                        p: [
                            {
                                l: 'Market Size & Market Share Hypothesis',
                            },
                            {
                                l: 'Channel hypothesis',
                            },
                        ]
                    },
                    {
                        l: 'What is the Revenue Model',
                        p: [
                            {
                                l: 'Sales?',
                            },
                            {
                                l: 'subscriptions?',
                            },
                            {
                                l: 'Referral?',
                            },
                            {
                                l: 'Affiliate?',
                            },
                        ]
                    },
                    {
                        l: 'What Are the Pricing Tactics',
                        p: [
                            {
                                l: 'Value pricing',
                            },
                            {
                                l: 'Competitive pricing',
                            },
                            {
                                l: 'Volume Pricing',
                            },
                            {
                                l: 'Portfolio Pricing',
                            },
                            {
                                l: 'Razor/blade model',
                            },
                            {
                                l: 'Subscription',
                            },
                            {
                                l: 'Leasing',
                            },
                            {
                                l: 'Freemium',
                            },
                            {
                                l: 'Other',
                            },
                            {
                                l: 'Does it add up to a business worth doing?',
                            },
                        ]
                    },
                    {
                        l: 'Revenue and Pricing Hypothesis Exit Criteria',
                        p:[
                            {
                                l: 'The units/users, revenue model and pricing add up to a business worth doing',
                            },
                            {
                                l: 'Pass/fail tests identified',
                            },
                        ]
                    },
                ],
            },
            {
                l: 'Design Tests',
                // goal: '',
                p: [
                    {
                        l: 'Devise Experiments for Testing the Business Model Hypothesis',
                        p: [
                            {
                                l: 'List key areas to learn',
                            },
                            {
                                l: 'Design Simplest pass/fail tests',
                            },
                            {
                                l: 'Run tests',
                            },
                            {
                                l: 'Process for tracking learning and insights from test results',
                            },
                            {
                                l: 'Design Tests Pass / Fail Tests identified',
                            },
                        ]
                    },
                ]
            },
        ]
        _.map(c, function (l) {
            if(!l.promptGroups) l.promptGroups = l.p
            _.map(l.promptGroups, function (g) {
                if(!g.prompts && g.p) g.prompts = g.p
                _.map(g.prompts, function (p) {
                    if(!p.id) p.id = p.l.split(' ').join('_')
                })
            })
        })
        return c
    }
}
