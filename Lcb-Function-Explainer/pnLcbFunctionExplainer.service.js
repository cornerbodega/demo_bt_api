angular.module("countryApp")
.factory("pnLcbFunctionExplainer", pnLcbFunctionExplainer)


function pnLcbFunctionExplainer() {

        return {
            user_add: 'In	addition	to	the	login	credentials	given	to	you	by	the	WSLCB,	the	Traceability	System	allows	each	licensee	the	abilility	to	grant	system	access	to	additional	users	for	data submission	on	your	behalf.		Please	be	aware	that	this	is	distinct	from	drivers (or employees).',
            inventory_adjust:
            'Adjust the amount or quantity of an inventory item',

            inventory_destroy_schedule:
            'Notify the traceability system of intent to destroy an inventory item.',

            inventory_destroy_schedule_undo:
            'Correct inventory that was accidentally scheduled for destruction before it has actually been destroyed.',

            inventory_destroy: 'Destroy an item that has been previously scheduled for destruction.',

            inventory_move: 'Update the current room for the specified inventory items.',

            inventory_new: 'Create new inventory not previously entered into the system. This function is only accessible to producers.',

            inventory_manifest: 'Notify the traceability system of intent to transfer an inventory item to another I-502 location.',

            inventory_manifest_void: 'Cancel a manifest that has been previously filed.',

            inventory_manifest_void_stop: 'Void a specific stop on a manifest that has been previously filed. If there are no remaining active stops, the manifest itself will be automatically voided.',

            inventory_manifest_void_items: 'The inventory_manifest_void_items function will void one or more items from a manifest. If there are no remaining active items in a specific stop, that stop will be automatically voided. If there are no remaining active items in the entire manifest itself, the manifest will be automatically voided.',

            inventory_transfer_outbound: 'Transfer inventory that already exists in the system. A manifest must be filed prior to all transfers.',

            inventory_transfer_outbound_return_lookup: 'The inventory_transfer_outbound_return_lookup function can be used to perform a lookup of any items that have been sent, but not fully received by the recipient.',

            inventory_transfer_outbound_return: 'The inventory_transfer_outbound_return function can be used to return items to inventory which were either partially or fully rejected by the recipient.',

            inventory_transfer_outbound_modify: 'The inventory_transfer_outbound_modify function will allow a user to modify the price recorded for an inventory transfer sale. This can be used before filing a monthly report if a line item mistake is noticed and needs to be corrected.',

            inventory_transfer_outbound_void: 'Void an inventory transfer that has been completed but not yet received by the recipient. This can be used for instances where a sale has been reported complete on the sender end; but was made in error. The transfer can then be made again; or the manifest voided, if necessary.',

            inventory_transfer_inbound: 'Officially receive inventory from another licensee.',

            inventory_transfer_inbound_modify: 'Modify the refund price recorded for an inventory transfer sale that came into a licensed location. This can be used before filing a monthly report if a line item mistake is noticed and needs to be corrected.',

            inventory_create_lot: 'This function will notify the Traceability System of the creation of a flower lot from cured flower or an other material lot from cured other material.',

            inventory_split: 'Split inventory items into sub-lots. For example, if a user has a lot of Flower and only wishes to sell half of it, they would need to first create a sub lot using this function. Then, with the new lot number, they can sell the desired amount.',

            inventory_convert: 'Convert one type of item into another. A Flower Lot is required to produce Usable Marijuana. A Lot of either Flower or Other Material is required to produce an Extract. An Extract is required to produce Liquid Marijuana Infused Edible, Marijuana Extract for Inhalation, Marijuana Infused Topicals, and Solid Marijuana Infused Edible.',

            inventory_sample: 'Create a sample for the purposes of negotiating a sale as allowed by law.',

            inventory_qa_sample: 'Create a QA sample to provide to qualified testing facilities as allowed by law. This function will notify the Traceability System of inventory deductions resulting from samples provided to independent testing labs for the purpose of quality assurance testing. ',

            inventory_qa_sample_void: 'Void a sample that has been sent out (from the traceability system’s perspective), but not tested yet.',

            inventory_qa_sample_results: 'Provide QA results as allowed by law. As QA facilities will be reporting directly, most licensed facilities will not need to report the results themselves.',

            inventory_qa_sample_non_mandatory: 'The inventory_qa_sample_non_mandatory function will allow a licensee to create a non-mandatory QA sample for sending to a QA lab. This can be a sample of any inventory type, and can also originate from a plant in cultivation. These items cannot be sold and may only be sent via manifest to a QA lab. Once there, the results will not be reported to traceability and the results should be received and reported outside of the system. No system deduction occurs to plants still in cultivation.',

            plant_new: 'Enter new plants into the traceability system.',

            plant_new_undo: 'orrect a mistake. This function can be used when a user accidentally moves items from the inventory to the plant area inadvertently. It can only be used on plants that have not been destroyed or harvested. Also, the parent item the plant was sourced from must also still be in possession of the licensee. Once called on a plant identifier, the system will automatically remove the plant from the system and increment the quantity of the parent source by one.',

            plant_move:'Move plants from their current room to a new one.',

            plant_destroy_schedule:'Schedule for destruction a plant or set of plants. This event will begin a 72-hour waiting period before a plant_destroy function may be called on the plant(s).',

            plant_destroy_schedule_undo:'Correct plants that were accidentally scheduled for destruction; before they’ve actually been destroyed.',

            plant_destroy: 'Destroy a plant or set of plants. Plants may only be destroyed after the waiting period has expired.',

            plant_harvest_schedule :'Notify the traceability system of intent to begin harvesting a plant or set of plants. This notification must occur before a harvest can be performed for these plants.',

            plant_harvest_schedule_undo:'Allow a licensee to correct plants that were accidentally scheduled for harvest.',

            plant_harvest: 'Begin the process of harvesting a plant. Said plant will change from the “growing” phase to the “drying” phase. During this process, the system requires the cultivator weigh the wet Flower harvested from each plant. In addition, cultivators may optionally enter weights of associated Other Plant Material and/or Waste resulting from harvest.',

            plant_harvest_undo:'Correct plants that were accidentally harvested and need to be placed into the growth phase of cultivation. If derivative items were collected and have been altered; this function will report an error. Or, if the plant is no longer in cultivation this function will also report an error. ',

            plant_waste_weigh:'Take a general waste weight for destruction accountability at a later point.',

            plant_cure:'Begin the process of curing a plant. Said plant will move from the rying phase to inventory. During this process, the system requires the cultivator take a weight of dry flower harvested from each plant. In addition cultivators may optionally enter weights of associated Other Plant Material and/or Waste resulting from harvest. Note	that	the	plant’s	phase	must	be	“Drying”	in	order	for	the	plant to	be	cured.',

            plant_cure_undo:'Correct plants that were accidentally cured and need to be placed into cultivation. If any of the derivative items have been altered, this function will report an error.',

            plant_convert_to_inventory:'Convert a plant that is growing (but not flowering) into an inventory item that can then be transferred and sold. Once converted, the new item will keep its identifier but will now have an inventory type of Mature Plant.',

            inventory_items_resulting_from_harvesting_and_curing:'After	both the	harvesting	and	curing	processes	are	complete,	the	following	items	may	be	found	within	Inventory:',
            // plant_yield_modify:'',
            // plant_modify:'',

            // qa_testing:'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',
            // :'',

        }
}
