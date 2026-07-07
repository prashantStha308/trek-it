export const validatePackageCreationFormData = (formData, { requireThumbnail = true } = {}) => {
    const errors = {};
    if (!formData.name.trim()) {
        errors.name = "Package name is required";
    }
    if (!formData.description.trim()) {
        errors.description = "Description is required";
    }
    if (formData.keywords.length === 0) {
        errors.keywords = "At least one keyword is required";
    }
    if (formData.activities.length === 0) {
        errors.activities = "At least one activity is required";
    }
    if (!formData.minGroupSize || formData.minGroupSize < 1) {
        errors.minGroupSize = "Min group size is required";
    }
    if (!formData.maxGroupSize || formData.maxGroupSize < 1) {
        errors.maxGroupSize = "Max group size is required";
    } else if (formData.maxGroupSize > 50) {
        errors.maxGroupSize = "Max group size cannot exceed 50";
    } else if (Number(formData.maxGroupSize) < Number(formData.minGroupSize)) {
        errors.maxGroupSize = "Max group size cannot be less than min group size";
    }
    if (!formData.pricePerPerson || formData.pricePerPerson < 1) {
        errors.pricePerPerson = "Price per person is required";
    } else if (formData.pricePerPerson > 9999) {
        errors.pricePerPerson = "Price per person cannot exceed NRs. 9999";
    }
    if (!formData.daysAlloted || formData.daysAlloted < 1) {
        errors.daysAlloted = "Duration is required";
    } else if (formData.daysAlloted > 32) {
        errors.daysAlloted = "Duration cannot exceed 32 days";
    }
    if (formData.stops.length === 0) {
        errors.stops = "At least one itinerary stop is required";
    }
    if (requireThumbnail && !formData.thumbnail) {
        errors.thumbnail = "A thumbnail image is required";
    }
    return errors;
};