class BodyTreking {
  constructor(data) {
    const { ttnId } = data;
    this.modelName = "TrackingDocument";
    this.calledMethod = "getStatusDocuments";
    this.methodProperties = {
      Documents: [
        {
          DocumentNumber: ttnId,
          Phone: "",
        },
      ],
    };
  }
}

export default BodyTreking;
