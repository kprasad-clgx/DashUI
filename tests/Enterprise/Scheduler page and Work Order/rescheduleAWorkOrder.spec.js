import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { WorkOrderPurchaseOrderPage } from '../../../pageObjects/enterprise/accountingInformation/WorkOrderPurchaseOrderPage.po.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };
import workOrderData from '../../../testData/enterprise/accountingInformation/workOrderPurchaseOrder.json' with { type: 'json' };


test('Reschedule A Work Order', async ({ authenticatedPage }) => {
    const workOrderPage = new WorkOrderPurchaseOrderPage(authenticatedPage);
    const jobNumber = jobData.jobNumber;
    await searchJobNumber(authenticatedPage, jobNumber);
    await workOrderPage.openWorkOrderPurchaseOrder();
    const workOrderNumber = await workOrderPage.createNewWorkOrder(workOrderData.newWorkOrder);

    // Verify creation
    await workOrderPage.verifyGridEntry(workOrderNumber);

    // Get the original estimated start date before rescheduling
    const originalDateStr = await workOrderPage.getEstimatedStartDateFromGrid(workOrderNumber);
    const originalDate = new Date(originalDateStr);
    
    // Calculate expected date after 7-day reschedule
    const expectedDate = new Date(originalDate);
    expectedDate.setDate(expectedDate.getDate() + 7);
    const expectedDateFormatted = expectedDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric' 
    });

    // Reschedule work order by 7 days
    await workOrderPage.rescheduleWorkOrder(7);

    // Verify the new estimated start date in the grid
    const updatedDateStr = await workOrderPage.getEstimatedStartDateFromGrid(workOrderNumber);
    const updatedDate = new Date(updatedDateStr);
    const updatedDateFormatted = updatedDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric' 
    });

    // Assert the date was rescheduled correctly
    expect(updatedDateFormatted).toBe(expectedDateFormatted);
});    

