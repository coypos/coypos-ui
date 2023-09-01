import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import ButtonComponent from "@/components/ButtonComponent.vue";
import FlagsComponent from "@/components/FlagsComponent.vue";
import ProductComponent from "@/components/ProductComponent.vue";

describe("ButtonComponent.vue", () => {
  it("renders text in button when passed", () => {
    const text = "message";
    const wrapper = shallowMount(ButtonComponent, {
      props: { text },
    });
    expect(wrapper.text()).to.include(text);
  });
  it("renders with color class when passed", () => {
    const color = "yellow";
    const wrapper = mount(ButtonComponent, { props: { color: color } });
    const classes = wrapper.vm.updateClass();

    expect(classes).to.contain("btn-warning");
  });
});
describe("FlagsComponent.vue", () => {
  it("should render", () => {
    const wrapper = shallowMount(FlagsComponent);
    expect(wrapper.find("#pl").isVisible()).to.be.true;
    expect(wrapper.find("#uk").isVisible()).to.be.true;
    expect(wrapper.find("#en").isVisible()).to.be.true;

    expect(wrapper.find("#de").isVisible()).to.be.true;
  });
});
describe("ProductComponent.vue", () => {
  it("renders text in button when passed", () => {
    const text = "message";
    const wrapper = shallowMount(ProductComponent, {
      props: { text },
    });
    expect(wrapper.text()).to.include(text);
  });
  it("renders with color class when passed", () => {
    const color = "yellow";
    const wrapper = mount(ProductComponent, { props: { color: color } });
    const classes = wrapper.vm.updateClass();

    expect(classes).to.contain("btn-warning");
  });
  it("renders with small class when passed", () => {
    const small = true;
    const wrapper = mount(ProductComponent, { props: { small: small } });
    const classes = wrapper.vm.updateClass();

    expect(classes).to.contain("small");
  });
});
