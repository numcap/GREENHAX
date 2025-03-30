import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEntry.css'; // You'll need to create this CSS file

export const AddEntry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    car_distance: '',
    public_transit_distance: '',
    biking_distance: '',
    lighting_hours: '',
    appliance_usage_hours: '',
    computer_usage_hours: '',
    device_charging_hours: '',
    electric_vehicle_charging_kwh: '',
    renewable_energy_usage_kwh: '',
    heating_usage: '',
    meat_meals: '',
    veg_meals: '',
    waste_generated: '',
    shower_duration_minutes: '',
    appliance_usage_hours_water: '',
    other_water_usage_hours: '',
    single_use_items_used: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least one field has been filled
    const hasEntry = Object.values(formData).some(value => value !== '');
    if (!hasEntry) {
      setError('Please fill at least one field');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Filter out empty fields
      const dataToSubmit = Object.fromEntries(
        Object.entries(formData)
          .filter(([, value]) => value !== '')
          .map(([key, value]) => {
            // Convert string values to appropriate types
            if (['meat_meals', 'veg_meals', 'single_use_items_used'].includes(key)) {
              return [key, parseInt(value)];
            } else {
              return [key, parseFloat(value)];
            }
          })
      );

      const response = await fetch('http://localhost:3000/api/environmental-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const result = await response.json();
      // Store results in localStorage or state management and navigate to results page
      localStorage.setItem('environmentalInsights', JSON.stringify(result));
      navigate('/insights'); // Assuming you have a route for displaying results
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-entry-container">
      <h2>Track Your Environmental Impact</h2>
      <p className="form-description">
        Fill in the details about your daily activities to receive personalized environmental insights.
        All fields are optional - provide what you can!
      </p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="entry-form">
        {/* Transportation Section */}
        <section className="form-section">
          <h3>Transportation</h3>
          <div className="form-group">
            <label htmlFor="car_distance">Car Distance (km)</label>
            <input
              type="number"
              id="car_distance"
              name="car_distance"
              value={formData.car_distance}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="Daily kilometers driven"
            />
          </div>

          <div className="form-group">
            <label htmlFor="public_transit_distance">Public Transit (km)</label>
            <input
              type="number"
              id="public_transit_distance"
              name="public_transit_distance"
              value={formData.public_transit_distance}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="Daily kilometers on public transit"
            />
          </div>

          <div className="form-group">
            <label htmlFor="biking_distance">Walking/Biking (km)</label>
            <input
              type="number"
              id="biking_distance"
              name="biking_distance"
              value={formData.biking_distance}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="Daily kilometers walked or biked"
            />
          </div>
        </section>

        {/* Energy Usage Section */}
        <section className="form-section">
          <h3>Energy Usage</h3>
          <div className="form-group">
            <label htmlFor="lighting_hours">Lighting (hours)</label>
            <input
              type="number"
              id="lighting_hours"
              name="lighting_hours"
              value={formData.lighting_hours}
              onChange={handleChange}
              min="0"
              step="0.5"
              placeholder="Hours using lighting"
            />
          </div>

          <div className="form-group">
            <label htmlFor="appliance_usage_hours">Appliance Usage (hours)</label>
            <input
              type="number"
              id="appliance_usage_hours"
              name="appliance_usage_hours"
              value={formData.appliance_usage_hours}
              onChange={handleChange}
              min="0"
              step="0.5"
              placeholder="Hours using appliances"
            />
          </div>

          <div className="form-group">
            <label htmlFor="computer_usage_hours">Computer Usage (hours)</label>
            <input
              type="number"
              id="computer_usage_hours"
              name="computer_usage_hours"
              value={formData.computer_usage_hours}
              onChange={handleChange}
              min="0"
              step="0.5"
              placeholder="Hours using computer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="device_charging_hours">Device Charging (hours)</label>
            <input
              type="number"
              id="device_charging_hours"
              name="device_charging_hours"
              value={formData.device_charging_hours}
              onChange={handleChange}
              min="0"
              step="0.5"
              placeholder="Hours charging devices"
            />
          </div>

          <div className="form-group">
            <label htmlFor="electric_vehicle_charging_kwh">EV Charging (kWh)</label>
            <input
              type="number"
              id="electric_vehicle_charging_kwh"
              name="electric_vehicle_charging_kwh"
              value={formData.electric_vehicle_charging_kwh}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="kWh for EV charging"
            />
          </div>

          <div className="form-group">
            <label htmlFor="renewable_energy_usage_kwh">Renewable Energy (kWh)</label>
            <input
              type="number"
              id="renewable_energy_usage_kwh"
              name="renewable_energy_usage_kwh"
              value={formData.renewable_energy_usage_kwh}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="kWh from renewable sources"
            />
          </div>

          <div className="form-group">
            <label htmlFor="heating_usage">Heating Usage (kWh)</label>
            <input
              type="number"
              id="heating_usage"
              name="heating_usage"
              value={formData.heating_usage}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="kWh used for heating"
            />
          </div>
        </section>

        {/* Diet Section */}
        <section className="form-section">
          <h3>Diet</h3>
          <div className="form-group">
            <label htmlFor="meat_meals">Meat-Based Meals</label>
            <input
              type="number"
              id="meat_meals"
              name="meat_meals"
              value={formData.meat_meals}
              onChange={handleChange}
              min="0"
              step="1"
              placeholder="Number of meat meals"
            />
          </div>

          <div className="form-group">
            <label htmlFor="veg_meals">Plant-Based Meals</label>
            <input
              type="number"
              id="veg_meals"
              name="veg_meals"
              value={formData.veg_meals}
              onChange={handleChange}
              min="0"
              step="1"
              placeholder="Number of plant-based meals"
            />
          </div>
        </section>

        {/* Resource Usage Section */}
        <section className="form-section">
          <h3>Resource Usage</h3>
          <div className="form-group">
            <label htmlFor="waste_generated">Waste Generated (kg)</label>
            <input
              type="number"
              id="waste_generated"
              name="waste_generated"
              value={formData.waste_generated}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="Kilograms of waste"
            />
          </div>

          <div className="form-group">
            <label htmlFor="shower_duration_minutes">Shower Duration (minutes)</label>
            <input
              type="number"
              id="shower_duration_minutes"
              name="shower_duration_minutes"
              value={formData.shower_duration_minutes}
              onChange={handleChange}
              min="0"
              step="0.5"
              placeholder="Minutes spent showering"
            />
          </div>

          <div className="form-group">
            <label htmlFor="appliance_usage_hours_water">Water Appliance Usage (hours)</label>
            <input
              type="number"
              id="appliance_usage_hours_water"
              name="appliance_usage_hours_water"
              value={formData.appliance_usage_hours_water}
              onChange={handleChange}
              min="0"
              step="0.5"
              placeholder="Hours using water appliances"
            />
          </div>

          <div className="form-group">
            <label htmlFor="other_water_usage_hours">Other Water Usage (hours)</label>
            <input
              type="number"
              id="other_water_usage_hours"
              name="other_water_usage_hours"
              value={formData.other_water_usage_hours}
              onChange={handleChange}
              min="0"
              step="0.5"
              placeholder="Hours of other water usage"
            />
          </div>

          <div className="form-group">
            <label htmlFor="single_use_items_used">Single-Use Items</label>
            <input
              type="number"
              id="single_use_items_used"
              name="single_use_items_used"
              value={formData.single_use_items_used}
              onChange={handleChange}
              min="0"
              step="1"
              placeholder="Number of single-use items"
            />
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate Environmental Impact'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEntry;