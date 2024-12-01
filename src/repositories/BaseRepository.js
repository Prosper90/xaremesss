import mongoose from "mongoose";

/**
 * @description BaseRepository
 * @class BaseRepository
 */
class BaseRepository {
  /**
   * @description Initializes the repository with a specific model
   * @param {Model} model - Mongoose model to interact with the database
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * @description Create a new document
   * @param {Object} options - Fields to include in the new document
   * @returns {Document} Newly created document
   */
  async create(options) {
    try {
      const document = await this.model.create(options);
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch a single document by a specific field and value
   * @param {string} field - Field to query by
   * @param {any} value - Value of the field to match
   * @returns {Document} Matching document
   */
  async findByField(field, value) {
    try {
      const document = await this.model.findOne({ [field]: value }).exec();
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch multiple documents based on options
   * @param {Object} options - Criteria to filter documents by
   * @returns {Array<Document>} Array of matching documents
   */
  async findByMany(options) {
    try {
      const documents = await this.model.find(options).exec();
      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch a document by ID
   * @param {string} id - Document ID
   * @returns {Document} Found document
   */
  async findById(id) {
    try {
      const document = await this.model.findById(id).exec();
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch all documents that match the query
   * @param {Object} query - Criteria for matching documents
   * @returns {Array<Document>} Array of documents
   */
  async findAll(query = {}) {
    try {
      const documents = await this.model.find(query);
      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Update a document by ID
   * @param {string} id - Document ID
   * @param {Object} updateOptions - Fields to update
   * @returns {Document} Updated document
   */
  async updateById(id, updateOptions) {
    try {
      const document = await this.model
        .findByIdAndUpdate(id, updateOptions, {
          new: true,
        })
        .exec();
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Update a document by user ID
   * @param {string} userId - User ID
   * @param {Object} options - Fields to update
   * @returns {Document} Updated document
   */
  async update(userId, options) {
    try {
      const document = await this.model
        .findOneAndUpdate({ userId }, options, {
          new: true,
        })
        .exec();
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Delete a document by ID
   * @param {string} id - Document ID
   * @returns {Document} Deleted document
   */
  async deleteById(id) {
    try {
      const document = await this.model.findByIdAndDelete(id).exec();
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Increment a field value for a specific document
   * @param {string} userId - User ID
   * @param {string} field - Field to increment
   * @param {number} amountBy - Amount to increment by
   * @returns {Document} Updated document
   */
  async increment(userId, field, amountBy) {
    try {
      const document = await this.model
        .findOneAndUpdate(
          { userId },
          { $inc: { [field]: amountBy } },
          { new: true }
        )
        .exec();
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Insert or update a single field value for a specific document
   * @param {Object} query - Criteria to match document
   * @param {string} field - Field to update
   * @param {any} value - New value of the field
   * @returns {Document} Updated document
   */
  async singleInsert(query, field, value) {
    try {
      const document = await this.model
        .findOneAndUpdate(query, { $set: { [field]: value } }, { new: true })
        .exec();
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Reset a field value for a specific document
   * @param {string} userId - User ID
   * @param {string} field - Field to reset
   * @param {any} value - Value to reset the field to (default is 0)
   * @returns {Document} Updated document
   */
  async reset(userId, field, value = 0) {
    try {
      const document = await this.model
        .findOneAndUpdate(
          { userId },
          { $set: { [field]: value } },
          { new: true }
        )
        .exec();
      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch all documents based on a specific field and value
   * @param {string} field - Field to filter by
   * @param {any} value - Value of the field
   * @returns {Array<Document>} Array of matching documents
   */
  async findByFieldAll(field, value) {
    try {
      const documents = await this.model.find({ [field]: value }).exec();
      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Execute an aggregation query based on user ID
   * @param {string} field - Field to match for aggregation
   * @param {any} value - Value of the field
   * @param {Array} lookups - Additional lookup stages for aggregation
   * @param {Object} projection - Fields to include in projection
   * @returns {Object|null} Result of aggregation or null if no match
   */
  async aggregationQueryByUserId(field, value, lookups = [], projection = {}) {
    try {
      const pipeline = [
        { $match: { [field]: value } },
        ...lookups,
        { $project: projection },
      ];

      const result = await this.model.aggregate(pipeline);
      return result.length ? result[0] : null;
    } catch (error) {
      throw error;
    }
  }
}

export default BaseRepository;
