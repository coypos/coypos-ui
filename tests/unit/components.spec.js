import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import ButtonComponent from "@/components/ButtonComponent.vue";
import FlagsComponent from "@/components/FlagsComponent.vue";
import ProductComponent from "@/components/ProductComponent.vue";
import BackButtonComponent from "@/components/BackButtonComponent.vue";
import PinComponent from "@/components/PinComponent.vue";

describe("BackButtonComponent.vue", () => {
  it("should render", () => {
    const wrapper = shallowMount(BackButtonComponent);
    expect(wrapper.find(".backbutton").isVisible()).to.be.true;
    expect(wrapper.find(".backbutton").find("img").isVisible()).to.be.true;
  });
});
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
//describe("PinComponent.vue", () => {
//  it("should render", () => {
//const wrapper = shallowMount(PinComponent);
//expect(wrapper.find(".pin").isVisible()).to.be.true;
//expect(wrapper.find(".pin").findAll(".row").length).to.equal(4);
//    expect(wrapper.find(".pin").find(".row").findAll(".col-4").length).to.equal(
//      3
//    );
//  });
//  it("click on number should add number to pin", () => {
//    const wrapper = shallowMount(PinComponent);
//    wrapper
//    .find(".pin")
//    .find(".row")
//      .find(".col-4")
//      .trigger("click")
//      .then(() => {
//        expect(wrapper.find(".row").find(".col-12").text()).to.contain("1");
//      });
//  });
//});

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
