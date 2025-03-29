/**
 * Middleware to validate environmental data input with all fields optional
 */
const validateInputData = (req, res, next) => {
    // Fields we might receive (all optional)
    const possibleFields = [
      'car_distance', 'public_transit_distance', 'biking_distance', 
      'lighting_hours', 'appliance_usage_hours', 'computer_usage_hours',
      'device_charging_hours', 'electric_vehicle_charging_kwh',
      'renewable_energy_usage_kwh', 'heating_usage', 'meat_meals',
      'veg_meals', 'waste_generated', 'shower_duration_minutes',
      'appliance_usage_hours_water', 'other_water_usage_hours',
      'single_use_items_used'
    ];
  

    // Validate numeric fields (only if they're provided)
    const numericFields = [
      'car_distance', 'public_transit_distance', 'biking_distance', 
      'lighting_hours', 'appliance_usage_hours', 'computer_usage_hours',
      'device_charging_hours', 'electric_vehicle_charging_kwh',
      'renewable_energy_usage_kwh', 'heating_usage', 'waste_generated', 
      'shower_duration_minutes', 'appliance_usage_hours_water', 'other_water_usage_hours'
    ];
    
    for (const field of numericFields) {
      if (req.body[field] !== undefined && isNaN(parseFloat(req.body[field]))) {
        return res.status(400).json({
          error: `Field '${field}' must be a numeric value`
        });
      }
    }
  

    // Validate integer fields (only if they're provided)
    // Note: 'meat_meals' and 'veg_meals' are expected to be integers, as in how many meals
    const integerFields = ['meat_meals', 'veg_meals', 'single_use_items_used'];
    
    for (const field of integerFields) {
      if (req.body[field] !== undefined && !Number.isInteger(Number(req.body[field]))) {
        return res.status(400).json({
          error: `Field '${field}' must be an integer value`
        });
      }
    }
  
    // Check if at least one field was provided
    const providedFields = possibleFields.filter(field => req.body[field] !== undefined);
    if (providedFields.length === 0) {
      return res.status(400).json({
        error: 'At least one data field must be provided'
      });
    }
  
    next();
  };
  
  module.exports = { validateInputData };