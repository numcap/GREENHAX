/**
 * Middleware to validate environmental data input
 */
const validateInputData = (req, res, next) => {
    const requiredFields = [
      'car_distance', 'public_transit_distance', 'biking_distance', 
      'lighting_hours', 'appliance_usage_hours', 'computer_usage_hours',
      'device_charging_hours', 'electric_vehicle_charging_kwh',
      'renewable_energy_usage_kwh', 'heating_usage', 'meat_meals',
      'veg_meals', 'waste_generated', 'shower_duration_minutes',
      'appliance_usage_hours_water', 'other_water_usage_hours',
      'single_use_items_used'
    ];
  
    const missingFields = requiredFields.filter(field => req.body[field] === undefined);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }
  
    // Validate numeric fields
    const numericFields = requiredFields.filter(field => 
      !['meat_meals', 'veg_meals', 'single_use_items_used'].includes(field)
    );
    
    for (const field of numericFields) {
      if (isNaN(parseFloat(req.body[field]))) {
        return res.status(400).json({
          error: `Field '${field}' must be a numeric value`
        });
      }
    }
  
    // Validate integer fields
    const integerFields = ['meat_meals', 'veg_meals', 'single_use_items_used'];
    
    for (const field of integerFields) {
      if (!Number.isInteger(Number(req.body[field]))) {
        return res.status(400).json({
          error: `Field '${field}' must be an integer value`
        });
      }
    }
  
    next();
  };
  
  module.exports = { validateInputData };