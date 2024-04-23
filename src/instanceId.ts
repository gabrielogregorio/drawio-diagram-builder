class InstanceId {
  private id: number;
  constructor() {
    this.id = 0;
  }

  getNextId() {
    this.id += 1;
    return `default-non-dynamic-id-to-git-${this.id}`;
  }
}

export const instanceId = new InstanceId();
