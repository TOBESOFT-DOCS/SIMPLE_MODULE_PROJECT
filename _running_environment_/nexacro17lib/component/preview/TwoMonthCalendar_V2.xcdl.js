//==============================================================================
//	개발중인 Compostie Component의 Component Class에 대한 정의를 작성합니다.
//==============================================================================
//==============================================================================
// Object : nexacro.TwoMonthCalendar_V2
// Group : Component
//==============================================================================
if (!nexacro.TwoMonthCalendar_V2)
{
	//==============================================================================
	// nexacro.TwoMonthCalendar_V2
	//==============================================================================
	nexacro.TwoMonthCalendar_V2 = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
	{
		nexacro._CompositeComponent.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		this.addEvent("onchanged");
	};
	
	var _pTwoMonthCalendar_V2 = nexacro._createPrototype(nexacro._CompositeComponent, nexacro.TwoMonthCalendar_V2);
	nexacro.TwoMonthCalendar_V2.prototype = _pTwoMonthCalendar_V2;
	_pTwoMonthCalendar_V2._type_name = "TwoMonthCalendar_V2";
	
	/* accessibility */
	_pTwoMonthCalendar_V2.accessibilityrole = "button";
	
	// 이 부분은 addEvent 에서 알아서 처리해주고 있음.
	/*_pTwoMonthCalendar_V2._event_list = {
	"onchanged" : 1
	};*/
	
	_pTwoMonthCalendar_V2.fromValue = undefined;
	_pTwoMonthCalendar_V2.set_fromValue = function (v)
	{
		if(this.form.calFrom)
		{
			this.form.calFrom.set_value(v);
		}
		this.fromValue = v;
	};
	
	_pTwoMonthCalendar_V2.toValue = undefined;
	_pTwoMonthCalendar_V2.set_toValue = function (v)
	{
		if(this.form.calTo)
		{
			this.form.calTo.set_value(v);
		}
		this.fromValue = v;
	};
	
	_pTwoMonthCalendar_V2.getDayCount = function ()
	{
		var fromDate = new Date();
		var toDate = new Date();
		var calDate;
		var day = 1000*60*60*24;
		var returnvalue = -1;
		
		if(this.form.calFrom.value && this.form.calTo.value)
		{
			fromDate.setFullYear(this.form.calFrom.getYear());
			fromDate.setMonth(this.form.calFrom.getMonth()-1);
			fromDate.setDate(this.form.calFrom.getDay());
			
			toDate.setFullYear(this.form.calTo.getYear());
			toDate.setMonth(this.form.calTo.getMonth()-1);
			toDate.setDate(this.form.calTo.getDay());
			
			calDate = fromDate.getTime() - toDate.getTime();
			trace("calDate: "+calDate);
			
			returnvalue = Math.abs(calDate/day);
		}
		trace("returnvalue: "+returnvalue);
		return returnvalue;
	};
	
	// 이벤트의 경우에는 모듈 디벨로퍼 내에서 테스트 할 수 있는 방법이 모호함
	_pTwoMonthCalendar_V2.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue)
	{
		trace('test'+this.onchanged._has_handlers);
		if (this.onchanged && this.onchanged._has_handlers)
		{
			var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
			return this.onchanged._fireEvent(this, evt);
		}
		return false;
	};	
	
	/************************************************************************
	FUNCTION : _get_form_module
	DESCRIPTION :
	RETURN :
	************************************************************************/
	_pTwoMonthCalendar_V2._get_form_module = function ()
	{
		return function()
		{
			if (!this._is_form)
			return;
			
			var obj = null;
			
			this.on_create = function()
			{
				this.set_name("TwoMonthCalendar_V2");
				this.set_titletext("TwoMonthCalendar_V2");
				if (nexacro.Form == this.constructor)
				{
					this._setFormPosition(405,200);
				}
				
				// Object(Dataset, ExcelExportObject) Initialize
				
				
				// UI Components Initialize
				obj = new nexacro.Calendar("calFrom","0","0","200","200",null,null,null,null,null,null,this);
				obj.set_taborder("0");
				obj.set_type("monthonly");
				obj.set_locale("en_US");
				this.addChild(obj.name, obj);
				
				obj = new nexacro.Calendar("calTo","205","0","200","200",null,null,null,null,null,null,this);
				obj.set_taborder("1");
				obj.set_type("monthonly");
				obj.set_locale("en_US");
				this.addChild(obj.name, obj);
				
				// Layout Functions
				//-- Default Layout : this
				obj = new nexacro.Layout("default","",405,200,this,function(p){});
				this.addLayout(obj.name, obj);
				
				// BindItem Information
				
			};
			
			this.loadPreloadList = function()
			{
				
			};
			
			// User Script
			this.registerScript("TwoMonthCalendar_V2.xcdl", function() {
					
					this.calFrom_onchanged = function(obj,e)
					{
						this.parent.set_fromValue(e.postvalue);
						this.parent.on_fire_onchanged(obj, e.pretext, e.prevalue, e.posttext, e.postvalue);
					};
					
					this.calTo_onchanged = function(obj,e)
					{
						this.parent.set_toValue(e.postvalue);
						this.parent.on_fire_onchanged(obj, e.pretext, e.prevalue, e.posttext, e.postvalue);
					};
					
				});
			
			// Regist UI Components Event
			this.on_initEvent = function()
			{
				this.calFrom.addEventHandler("onchanged",this.calFrom_onchanged,this);
				this.calTo.addEventHandler("onchanged",this.calTo_onchanged,this);
			};
			
			this.loadIncludeScript("TwoMonthCalendar_V2.xcdl");
			this.loadPreloadList();
			
			// Remove Reference
			obj = null;
		};
	};	
	
	delete _pTwoMonthCalendar_V2;
}